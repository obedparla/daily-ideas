import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import {BrowserRouter as Router} from "react-router-dom";
import Navigation from "./components/Navigation";
import React from "react";
import {withStyles} from "@material-ui/core";

import IdeaList from './components/IdeaList';

const App = (props) => {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" color="inherit" className={classes.grow}>
            Daily Ideas
          </Typography>
          <Router>
            <Navigation/>
          </Router>
        </Toolbar>
      </AppBar>

      <IdeaList />
    </div>
  );
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
    margin: '0 auto',
  },
  grow: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(App);