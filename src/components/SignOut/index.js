import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../../Firebase";

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);

  return (
    <Button type="button" onClick={firebase.signOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
