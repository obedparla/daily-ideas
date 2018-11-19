import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


class App extends React.Component {
  state = {
    checked: [0],
    idea: '',
  };

  handleToggle = value => () => {
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {

    const [ideasList, handleIdeaSubmit] = useState([]);
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Grid justify={'center'} spacing={'10px'} container>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h3" color="inherit">
                Daily Ideas
              </Typography>
            </Toolbar>
          </AppBar>

          <List className={classes.root}>
            {ideasList.map(value => (
              <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`Line item ${value + 1}`}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <CommentIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <form className={classes.container} noValidate autoComplete="off" onSubmit={handleIdeaSubmit}>
            <Paper className={classes.paper} elevation={1}>
              <TextField
                id="outlined-name"
                label="Ideas"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('idea')}
                margin="normal"
                variant="outlined"
              />
            </Paper>
          </form>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
});

export default withStyles(styles)(App);