import React from 'react';
import { Modal, Button } from 'carbon-components-react';
import '../styles/MetamaskLogin.css';
import MetamaskLogo from '../images/metamask.svg';
import checkAccount from '../util/isUserLogged.js';

class MetamaskLogin extends React.Component {
    state = {
      isOpen: true,
    }

    componentDidMount() {
      const checkInterval = 1000;
      this.interval = setInterval(
        () => {
          checkAccount().then(haveAccounts => {
            if (haveAccounts.length === 0) {
              this.setState({ isOpen: true })
            }
            if (haveAccounts.length !== 0) {
              this.setState({ isOpen: false })
            }
          })
        }, checkInterval)
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return(
          <Modal className="MetamaskLogin" open={this.state.isOpen} passiveModal>
            <p className="MetamaskLogin__title">
              To start investing, please <br/> login within the wallet.
            </p>
            <img className="MetamaskLogin__metamaskfox-image" src={MetamaskLogo} alt="Metamask" />
            <Button small className="MetamaskLogin__metamasklogin-button">
              Login within Metamask
            </Button>
            <br/>
            <br/>
            <Button small kind="ghost" className="MetamaskLogin__metamaskfriendlyguide-link">
              I'll do this later
            </Button>
          </Modal>
        )
    }

}

export default MetamaskLogin;