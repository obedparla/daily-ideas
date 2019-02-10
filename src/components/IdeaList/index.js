import React, { useContext, useEffect } from 'react';
import {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Fab from '@material-ui/core/Fab';
import {Add as AddIcon, Delete as DeleteIcon} from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import withFirebase from '../../Firebase/context';

const IdeaList = (props) => {
  const {classes} = props;
  const [ideasList, setIdeaList] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [idea, setIdea] = useState('');
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(withFirebase);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(
      authUser => {
        if (!(!!authUser)) {
          props.history.push(ROUTES.SIGN_IN);
        }
      },
    );
  })

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChange = event => {
    setIdea(event.target.value);
  };

  const handleIdeaSubmit = event => {
    event.preventDefault();
    setIdeaList([...ideasList, idea]);
    setIdea('');
  };

  const handleDelete = () => {
    const removedChecked = ideasList.filter(idea => checked.indexOf(idea) === -1);
    setIdeaList(removedChecked);
  }

  return (
    <div >
      {authUser && <h1>Account: {authUser.email}</h1>}
      <List className={classes.root}>
        {ideasList.map(value => (
          <Paper key={value} className={classes.paper} elevation={2} style={{textAlign: 'center'}}>
            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value}/>
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>

      <form className={classes.container} noValidate autoComplete="off" onSubmit={handleIdeaSubmit}>
        <Paper className={classes.paper} elevation={1} style={{textAlign: 'center'}}>
          <Grid container justify='center' alignItems={'center'}>
            <Fab color="primary" aria-label="Add" className={classes.button}>
              <AddIcon />
            </Fab>
            <TextField
              id="outlined-name"
              label="Ideas"
              className={classes.textField}
              value={idea}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Fab aria-label="Delete" className={classes.button} onClick={handleDelete}>
              <DeleteIcon/>
            </Fab>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}

  const styles = (theme) => ({
    grow: {
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


export default withStyles(styles)(withRouter(IdeaList));