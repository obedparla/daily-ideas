import React, { useContext, useEffect, useState } from "react";
import withFirebase from "../../Firebase/context";

const AuthUserContext = React.createContext(null);

const withAuthentication = Component => props => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const firebase = useContext(withFirebase);

  useEffect(() => {
    // If I save the function below it never executes. Need investigation as not unsubscribing
    // can cause a memory leak
    // const firebaseListener =

    firebase.auth.onAuthStateChanged(newAuthUser => {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      newAuthUser ? setAuthUser(newAuthUser) : setAuthUser(null);
    });

    // Stop the listener
    // return firebaseListener();
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...props} />
    </AuthUserContext.Provider>
  );
};

export { withAuthentication, AuthUserContext };
