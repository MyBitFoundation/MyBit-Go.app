import React from 'react';
import Box from '3box';
import Freddy from 'public/freddy.svg';
import { ExternalLinks } from 'constants/links';
import get from 'lodash/get';
const { Provider, Consumer } = React.createContext({});

const SPACE_ID = 'MYBIT_GO'

export const withThreeBoxContext = (Component) => {
    return class Higher extends React.Component{
      render(){
        return (
          <Consumer>
            {state => <Component {...this.props} threeBoxContext={state} />}
          </Consumer>
        )
      }
    }

}

class ThreeBoxProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loadingThreeBox: false,
          loadingThreeBoxThreadAPIAuthorization: false,
          loadingThreeBoxSpaceAuthorization: false,
          loadingThreeBoxThreadPostRequest: false,
          syncingThreeBox: false,
          loadThreeBoxProfile: this.loadThreeBoxProfile,
          openSpace: this.openSpace,
          openBox: this.openBox,
          getPosts: this.getPosts,
          getPostsFromThread: this.getPostsFromThread,
          postThread: this.postThread,
          getProfile: this.getProfile,
          getAvatar: this.getAvatar,
          box: null,
          hasAuthorizedThreeBox: false,
          hasOpenedGoSpace: false,
          threads: [],
          currentThread: {},
          space: null,
        }
        this.syncBoxDone = this.syncBoxDone.bind(this)
    }

    syncBoxDone = () => {
      console.log('********** [ ThreeBoxProvider - syncBoxDone ] init *********')
      this.setState({ syncingThreeBox: false })
    }

    openBox = async (userAddress) => {
      this.setState({ loadingThreeBox: true, loadingThreeBoxThreadAPIAuthorization: true })
      const currentProvider = window.web3js && window.web3js.currentProvider ?
        window.web3js.currentProvider :
        { error: 'No Provider selected' }
      return currentProvider.error ?
        currentProvider :
        (async (provider) => {
          this.setState({ loadingThreeBox: true });
          const box = await Box.openBox(userAddress, provider)
          box.onSyncDone( this.syncBoxDone );
          console.log('[ ThreeBoxProvider - openBox ] - box', box)
          this.setState({
            loadingThreeBox: false,
            box,
            hasAuthorizedThreeBox: true,
            loadingThreeBoxThreadAPIAuthorization: false,
            syncingThreeBox: true,
          });
          return box;
        })(currentProvider)
    }

    getPosts = async (threadName, moderator) => {
      console.log('[ ThreeBoxProvider - getPosts ] ', SPACE_ID, threadName, moderator)
      this.setState({ loadingThreeBox: true });
      const posts = await new Promise(async (res) => {
        try {
          const posts = await Box.getThread(
            SPACE_ID,
            threadName,
            moderator,
            false
          );
          res(posts)
          console.log('[ ThreeBoxProvider - getPosts ] posts (res)', posts)
        } catch (err) {
          console.log('[ ThreeBoxProvider - getPosts ] error', err)
          res([])
        }
      })
      console.log('[ ThreeBoxProvider - getPosts ] - posts', posts)
      this.setState({ loadingThreeBox: false });
      return posts;
    }

    getPostsFromThread = async(threadName) => {
      this.setState({ loadingThreeBox: true })
      const { space, threads } = this.state;
      console.log('[ ThreeBoxProvider - getPostsFromThread ] - space', space)
      const thread = threads[threadName] ?
        threads[threadName] :
        await space.joinThread(threadName);
      threads[threadName] = thread;
      const posts = thread ? await thread.getPosts() : [];
      this.setState({
        currentThread: thread,
        loadingThreeBox: false,
        threads
      });
      return posts;
    }

    postThread = async (threadName, update, callback) => {
      console.log('[ ThreeBoxProvider - postUpdate ] - threadName', threadName)
      this.setState({ loadingThreeBox: true, loadingThreeBoxThreadPostRequest: true });
      const { space, threads } = this.state;
      console.log('[ ThreeBoxProvider - postUpdate ] - space', space)
      const thread = threads[threadName] ?
        threads[threadName] :
        await space.joinThread(threadName);
      console.log('[ ThreeBoxProvider - postUpdate ] - thread', thread)
      threads[threadName] = thread;
      thread.onUpdate(() => {
        console.log('[ ThreeBoxProvider - postUpdate ] - onUpdate')
        callback();
      })
      const response = await thread.post(update);
      console.log('[ ThreeBoxProvider - postUpdate ] - response', response)
      this.setState({
        threads,
        currentThread: thread,
        loadingThreeBox: false,
        loadingThreeBoxThreadPostRequest: false,
      });
      return { thread, response };
    }

    openSpace = async () => {
        this.setState({ loadingThreeBox: true, loadingThreeBoxSpaceAuthorization: true });
        const { space, box } = this.state;
        const openedSpace = space ?
          space :
          await new Promise(async (res) => {
            try {
              const space = await box.openSpace(SPACE_ID);
              console.log('[ ThreeBoxProvider - openSpace ] - space', space)
              this.setState({ hasOpenedGoSpace: space !== null })
              res(space);
            } catch (err) {
              console.log('[ ThreeBoxProvider - openSpace ] - err', err)
              res({ error: err })
            }
          })
        this.setState({
          space: openedSpace,
          loadingThreeBox: false,
          loadingThreeBoxSpaceAuthorization: false
        });
        console.log('[ ThreeBoxProvider - openSpace ] - space', openedSpace)
        return openedSpace;
    }

    loadThreeBoxProfile = async (address) => {
        this.setState({ loadingThreeBox: true });
        const profile = await Box.getProfile(address)
        this.setState({ loadingThreeBox: false});
        return profile;
    }

    getProfile = this.loadThreeBoxProfile

    getAvatar = async (address) => {
      const profile = await this.loadThreeBoxProfile(address);
      let avatar = <Freddy />;
      if (profile.image) {
        const slug = get(profile, 'image.0.contentUrl./');
        avatar = ExternalLinks.IPFS_GATEWAY_HASH(slug);
      }
      return avatar;
    }

    render(){
        return (
          <Provider value={this.state}>
            {this.props.children}
          </Provider>
        )
    }
}

export default ThreeBoxProvider;
