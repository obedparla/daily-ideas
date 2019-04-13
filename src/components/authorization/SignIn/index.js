import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { PasswordForgetLink } from "../ResetPassword";
import { SignInForm, SignInGoogle, SingInFacebook } from "./components";
import { authModalStyles } from "../styles";
import * as ROUTES from "../../../constants/routes";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function SignIn(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm {...props} />

        <SignInGoogle {...props} />
        <SingInFacebook {...props} />

        <Link to={ROUTES.SIGN_UP} className={classes.signUpEmail}>
          <Button type="submit" fullWidth variant="contained" color="secondary">
            Create an account
          </Button>
        </Link>
        <PasswordForgetLink />
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(authModalStyles)(SignIn);
