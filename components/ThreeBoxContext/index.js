import React from 'react';
import Box from '3box';

const { Provider, Consumer } = React.createContext({});

export const withThreeBoxContext = (Component) => {
    return function WrapperComponent(props) {
        return (
            <Consumer>
                {state => <Component {...props} threeBoxContext={state} />}
            </Consumer>
        );
    };
}

class ThreeBoxProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loadingThreeBox: false,
          loadThreeBoxProfile: this.load3BoxProfile,
          openSpace: this.openSpace,
          openBox: this.openBox,
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

    openSpace = async (assetId) => {
        console.log('[ ThreeBoxProvider - openSpace ] - assetId', assetId)
        this.setState({ loadingThreeBox: true });
        const { spaces } = this.state;
        const id = `mybit-go-${assetId}`
        const space = spaces[id] ? 
          spaces[id] :
          await Box.openSpace(id)
        spaces[id] = space;
        this.setState({ spaces, loadingThreeBox: false });
        return spaces[id];
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