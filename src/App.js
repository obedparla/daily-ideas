import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import React from 'react';
import { withStyles } from '@material-ui/core';

import * as ROUTES from './constants/routes';
import IdeaList from './components/IdeaList';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { withAuthentication } from './components/Session';

const App = (props) => {
  const { classes } = props;

  return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h3" color="inherit" className={classes.grow}>
                Daily Ideas
              </Typography>
            </Toolbar>
            <Navigation />
          </AppBar>

          <Route exact path={ROUTES.LANDING} component={IdeaList} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        </div>
      </Router>
  );
};

const styles = () => ({
  root: {
    flexGrow: 1,
    width: '80%',
    margin: '0 auto',
  },
  grow: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(withAuthentication(App));