import React from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { LocalStorageKeys } from 'constants/localStorageKeys';
import { TOS_VERSION } from 'constants/tosVersion';
const { Provider, Consumer } = React.createContext({});

export const withTermsOfServiceContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
        {state => <Component {...props} TOSContext={state} />}
      </Consumer>
    );
  };
}

const TermsOfServiceProvider = ({ children }) => {
  const [readTOS, setReadTOS] = useLocalStorage(LocalStorageKeys.ACCEPTED_TOS_AND_POLICY_DATA);
  const value = {readTOS, setReadTOS, TOS_VERSION};
  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}

export default TermsOfServiceProvider;
