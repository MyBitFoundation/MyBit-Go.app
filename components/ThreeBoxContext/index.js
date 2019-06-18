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
          box: null,
          hasAuthorizedThreeBox: false,
          spaces: {},
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
          this.setState({ loadingThreeBox: false, box, hasAuthorizedThreeBox: true });
          return box;
        })(currentProvider)
    }

    getPosts = async (threadName, moderator) => {
      console.log('[ ThreeBoxProvider - getPosts ] ', SPACE_ID, threadName, moderator, typeof moderator === 'string')
      this.setState({ loadingThreeBox: true });
      const posts = await Box.getThread(
        SPACE_ID, 
        threadName,
        { firstModerator: moderator, members: true }
      )
      console.log('[ ThreeBoxProvider - getPosts ] - posts', posts)
      this.setState({ loadingThreeBox: false });
      return posts;
    }

    openSpace = async (assetId) => {
        console.log('[ ThreeBoxProvider - openSpace ] - assetId', assetId)
        this.setState({ loadingThreeBox: true });
        const { spaces } = this.state;
        const space = spaces[SPACE_ID] ? 
          spaces[SPACE_ID] :
          await Box.openSpace(SPACE_ID)
        spaces[SPACE_ID] = space;
        this.setState({ spaces, loadingThreeBox: false });
        return spaces[SPACE_ID];
    }

    loadThreeBoxProfile = async (address) => {
        this.setState({ loadingThreeBox: true });
        const profile = await Box.getProfile(address)
        this.setState({ loadingThreeBox: false});
        return profile;
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