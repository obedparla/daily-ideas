import React, { useContext, useEffect, useState } from 'react';
import withFirebase from '../../Firebase/context';

const AuthUserContext = React.createContext(null);

const withAuthentication = Component => (props) => {

  const [ authUser, setAuthUser ] = useState(null);
  const firebase = useContext(withFirebase);

  useEffect(() => {
    const firebaseListener = () => {};

    firebase.auth.onAuthStateChanged(newAuthUser => {
      console.log('New auth user', newAuthUser);

      newAuthUser ? setAuthUser(newAuthUser) : setAuthUser(null);
    });

    // Stop the listener
    return firebaseListener();
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...props} />
    </AuthUserContext.Provider>
  );
};

const authContext = Component => props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <Component authUser={authUser} {...props} />}
    </AuthUserContext.Consumer>
  );
};

export {
  withAuthentication,
  authContext,
  AuthUserContext,
};

