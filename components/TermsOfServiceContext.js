import React from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { LocalStorageKeys } from 'constants/localStorageKeys';
import { TOS_VERSION } from 'constants/tosVersion';
const { Provider, Consumer } = React.createContext({});

export const withTermsOfServiceContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
        {state => <Component {...props} ToSContext={state} />}
      </Consumer>
    );
  };
}

const TermsOfServiceProvider = ({ children }) => {
  const [readToS, setReadToS] = useLocalStorage(LocalStorageKeys.ACCEPTED_TOS);
  const setReadToSWrapper = () => setReadToS(TOS_VERSION);
  const value = {
    readToS: Array.isArray(readToS) ? false : true,
    setReadToS: setReadToSWrapper,
  };
  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}

export default TermsOfServiceProvider;
