import React from 'react';
import { Modal, Button } from 'carbon-components-react';
import '../styles/MetamaskLogin.css';
import MetamaskLogo from '../images/metamask.svg';
import checkAccount from '../util/isUserLogged';

class MetamaskLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    const checkInterval = 1000;
    this.interval = setInterval(() => {
      checkAccount().then((haveAccounts) => {
        if (haveAccounts.length === 0) {
          this.setState({ isOpen: true });
        }
        if (haveAccounts.length !== 0) {
          this.setState({ isOpen: false });
        }
      });
    }, checkInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Modal className="MetamaskLogin" open={this.state.isOpen} passiveModal>
        <p className="MetamaskLogin__title">
              To start investing, please <br /> login to Metamask.
        </p>
        <img className="MetamaskLogin__metamaskfox-image" src={MetamaskLogo} alt="Metamask" />
        <a href="https://www.youtube.com/watch?time_continue=25&v=6Gf_kRE4MJU" target="_blank" rel="noopener noreferrer">
          <Button small className="MetamaskLogin__metamasklogin-button">
                Click here to see how
          </Button>
        </a>
        <br />
        <br />
      </Modal>
    );
  }
}

export default MetamaskLogin;