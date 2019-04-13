import React from "react";
import { useContext, useState } from "react";
import { withRouter } from "react-router-dom";

import withFirebase from "../../../Firebase/context";
import * as ROUTES from "../../../constants/routes";
import {
  ERROR_CODE_ACCOUNT_EXISTS,
  ERROR_MSG_ACCOUNT_EXISTS,
} from "./messages";
import Button from "@material-ui/core/Button";

const SignInGoogleBase = props => {
  const { classes } = props;
  const [error, setError] = useState(null);
  const firebase = useContext(withFirebase);

  const onSubmit = event => {
    firebase
      .signInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          createdAt: firebase.serverValue.TIMESTAMP,
          roles: [],
        });
      })
      .then(() => {
        setError(null);
        props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setError(error);
      });

    event.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.facebook}
      >
        Sign in with Facebook
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withRouter(SignInGoogleBase);
