import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../constants/routes";

export const withAuthorization = condition => Component => {
  const WithAuthorizationComp = props => {
    const firebase = useContext(withFirebase);

    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          props.history.push(ROUTES.SIGN_IN);
        }
      });

      return () => listener();
    }, []);

    return <Component {...props} />;
  };

  return withRouter(WithAuthorizationComp);
};
