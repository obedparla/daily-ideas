import React, { useContext } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";

import { PasswordForgetLink } from "../ResetPassword";
import { SignInForm, SignInGoogle, SingInFacebook } from "./components";
import { authModalStyles } from "../styles";
import * as ROUTES from "../../../constants/routes";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../../../hocs/Session";
import { LANDING } from "../../../constants/routes";
import { PaperWrapper } from "../../../components";

function SignIn(props) {
  const { classes } = props;
  const authUser = useContext(AuthUserContext);

  if (authUser) {
    props.history.push(LANDING);
  }

  return (
    <PaperWrapper smallWidth>
      <Typography component="h1" variant="h5" gutterBottom align="center">
        Sign in
      </Typography>
      <SignInForm {...props} />

      <SignInGoogle {...props} />
      <SingInFacebook {...props} />

      <Link to={ROUTES.SIGN_UP}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.signUpEmail}
        >
          Create an account
        </Button>
      </Link>
      <PasswordForgetLink />
    </PaperWrapper>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(authModalStyles)(SignIn));
