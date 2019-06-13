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
          load3BoxProfile: this.load3BoxProfile
        }
    }

    load3BoxProfile = async (address) => {
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