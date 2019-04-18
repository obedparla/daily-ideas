import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import React, { useContext } from "react";
import { withStyles, Button } from "@material-ui/core";

import * as ROUTES from "./constants/routes";
import IdeaList from "./components/IdeaList";
import SignUp from "./components/authorization/SignUp";
import SignIn from "./components/authorization/SignIn";
import { AuthUserContext, withAuthentication } from "./components/Session";
import PasswordForgetPage from "./components/authorization/ResetPassword";
import AdminPage from "./components/Admin";
import AccountPage from "./components/Account";
import LandingPage from "./components/Landing";

const App = props => {
  const { classes } = props;

  const authUser = useContext(AuthUserContext);

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Daily Ideas
            </Typography>
            <Navigation />
          </Toolbar>
        </AppBar>

        {authUser ? (
          <>
            <Route exact path={ROUTES.LANDING} component={IdeaList} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          </>
        ) : (
          <>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
          </>
        )}

        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />

        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      </div>
    </Router>
  );
};

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default withStyles(styles)(withAuthentication(App));
