import React, { Component } from "react";
import styled from 'styled-components';
import getConfig from 'next/config';

export const { Provider, Consumer } = React.createContext({});

const CivicButtonWrapper = styled.button`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: 0;
  max-width: 300px;
  height: 50px;
  line-height: 50px;
  padding: 0 50px 0 62px;
  border-radius: 100px;
  background-color: #3AB03E;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-family: 'Source Sans Pro', sans-serif;
  &:hover {
    background-color: #008C04;
  }
  > svg {
    position: absolute;
    top: 12px;
    left: 12px;
  }
`
export const CivicButton = (props) => (
  <CivicButtonWrapper {...props}>
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M3,12 C3,16.7557705 6.8112793,21 12,21 C16.3410645,21 19.8986122,18.5324628 20.9909576,15 L24,15 C22.8386328,20.1411987 18.861084,24 12,24 C4.36572266,24 4.40760283e-16,18.8982832 0,12.0000449 C0,5.10180664 4.38793945,0 12,0 C19.0664062,0 22.8386328,3.85880133 24,9 L20.9909576,9 C19.8986122,5.46744739 16.6115723,3 12,3 C6.49707031,3 3,7.24413967 3,12 Z M12,8 C13.6569,8 15,9.28596049 15,10.872371 C15,12.006383 13.9967,12.9866275 13,13.4535793 L13,17 L11,17 L11,13.4535793 C10.0032,12.9866275 9,12.006383 9,10.872371 C9,9.28596049 10.3432,8 12,8 Z" fill="#FFFFFF" />
    </svg>
    Connect with Civic
  </CivicButtonWrapper>
)

class Civic extends Component {
  constructor(props) {
    super(props);
    this.civicSip = null;
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
    this.handleCodeReceived = this.handleCodeReceived.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleCanceled = this.handleCanceled.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.state = {
      status: "pending",
      token: null,
      signUp: this.signUp,
      logout: this.logout
    };
  }

  componentDidMount() {
    const { publicRuntimeConfig } = getConfig();

    this.civicSip = new window.civic.sip({
      appId: publicRuntimeConfig.REACT_APP_CIVIC_APP_ID,
    });
    this.civicSip.on("auth-code-received", this.handleCodeReceived);
    this.civicSip.on("user-cancelled", this.handleCanceled);
    this.civicSip.on("read", this.handleRead);
    this.civicSip.on("civic-sip-error", this.handleError);
  }

  componentWillUnmount() {
    if(!this.civicSip) return;
    this.civicSip.off("auth-code-received", this.handleCodeReceived);
    this.civicSip.off("user-cancelled", this.handleCanceled);
    this.civicSip.off("read", this.handleRead);
    this.civicSip.off("civic-sip-error", this.handleError);
  }

  signUp(onSuccess, onReadCallback, onErrorCallback) {
    this.civicSip.signup({
      style: 'popup',
      scopeRequest: this.civicSip.ScopeRequests.BASIC_SIGNUP,
    });
    this.civicSip.on('auth-code-received', event => {
      onSuccess();
    });
  }

  logout() {
    this.setState({
      token: null
    });
  }

  handleCodeReceived(event) {
    this.setState({
      token: event.response
    });
  }

  handleCanceled(event) {
    console.log('User canceled.', event);
  }

  handleRead(event) {
    console.log('Reading QR code...', event);
  }

  handleError(error) {
    console.log('error', error);
  }

  render() {
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

export function withCivicContext(WrappedComponent) {
  return props => (
    <Civic>
      <Consumer>
        {(civic) => <WrappedComponent {...props} civic={civic} />}
      </Consumer>
    </Civic>
  );
}

export default Civic;
