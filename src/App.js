import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import React, { useContext } from "react";
import { withStyles } from "@material-ui/core";

import * as ROUTES from "./constants/routes";
import IdeaList from "./views/IdeaList";
import SignUp from "./views/authorization/SignUp";
import SignIn from "./views/authorization/SignIn";
import { AuthUserContext, withAuthentication } from "./hocs/Session";
import PasswordForgetPage from "./views/authorization/ResetPassword";
import AdminPage from "./views/Admin";
import AccountPage from "./views/Account";
import LandingPage from "./views/Landing";
import styled from "styled-components";

const Main = styled("main")`
  width: 80%;
  max-width: 1200px;
  margin: 40px auto;
  overflow-x: hidden;
`;

const App = props => {
  const { classes } = props;

  const authUser = useContext(AuthUserContext);

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to={ROUTES.LANDING}>Daily Ideas</Link>
            </Typography>
            <Navigation />
          </Toolbar>
        </AppBar>

        <Main>
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
        </Main>
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
