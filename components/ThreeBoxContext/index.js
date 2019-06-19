import React from 'react';
import Box from '3box';

const { Provider, Consumer } = React.createContext({});

const SPACE_ID = 'MYBIT_GO'

export const withThreeBoxContext = (Component) => {
    return class Higher extends React.Component{
      static getInitialProps(ctx) {
        if(Component.getInitialProps)
          return Component.getInitialProps(ctx);
        else return {};
      }
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
          loadThreeBoxProfile: this.loadThreeBoxProfile,
          openSpace: this.openSpace,
          openBox: this.openBox,
          getPosts: this.getPosts,
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
    }

    openBox = async (userAddress) => {
      const currentProvider = window.web3js && window.web3js.currentProvider ?
        window.web3js.currentProvider :
        { error: 'No Provider selected' }
      return currentProvider.error ? 
        currentProvider :
        (async (provider) => {
          this.setState({ loadingThreeBox: true });  
          const box = await Box.openBox(userAddress, provider)
          console.log('[ ThreeBoxProvider - openBox ] - box', box)
          this.setState({ loadingThreeBox: false, box, hasAuthorizedThreeBox: true });
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

    postThread = async (threadName, update) => {
      console.log('[ ThreeBoxProvider - postUpdate ] - threadName', threadName)
      this.setState({ loadingThreeBox: true });
      const { space, threads } = this.state;
      console.log('[ ThreeBoxProvider - postUpdate ] - threadName', space)
      const thread = threads[threadName] ?
        threads[threadName] :
        await space.joinThread(threadName);
        console.log('[ ThreeBoxProvider - postUpdate ] - thread', thread)
      threads[threadName] = thread;
      const response = await thread.post(update);
      console.log('[ ThreeBoxProvider - postUpdate ] - response', response)
      this.setState({ threads, currentThread: thread, loadingThreeBox: false});
      return { thread, response };
    }

    openSpace = async () => {
        this.setState({ loadingThreeBox: true });
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
        this.setState({ space: openedSpace, loadingThreeBox: false });
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
      const profile = await this.loadThreeBoxProfile(address)
      const avatar = `https://ipfs.infura.io/ipfs/${profile.image[0]['contentUrl']['/']}`
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