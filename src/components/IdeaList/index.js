import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Fab from "@material-ui/core/Fab";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { AuthUserContext, withAuthorization } from "../Session";
import withFirebase from "../../Firebase/context";
import { getCurrentDate } from "../../utils/dates";

const currentDate = getCurrentDate();
let titleTimeout;

const IdeaList = props => {
  const { classes } = props;
  const [ideasList, setIdeaList] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [idea, setIdea] = useState("");
  const [title, setTitle] = useState("");
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(withFirebase);
  const userId = authUser.uid;
  const firebaseIdeas = firebase.ideas(userId, currentDate);
  const firebaseTitle = firebase.ideaTitle(userId, currentDate);
  useEffect(() => {
    firebaseIdeas.on("value", snapshot => {
      const ideas = snapshot.val();

      if (ideas) {
        // Populate the list by going through the data we get from firebase db
        const ideasList = Object.keys(ideas).map(key => ideas[key].text);
        setIdeaList([...ideasList]);
      }
    });

    firebaseTitle.once("value", snapshot => setTitle(snapshot.val()));

    return () => {
      firebaseIdeas.off();
      firebaseTitle.off();
    };
  }, []);

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
    firebaseIdeas.push({ text: idea, date: new Date().getTime() });
    setIdea("");
  };

  const handleDelete = () => {
    const removedChecked = ideasList.filter(
      idea => checked.indexOf(idea) === -1
    );
    setIdeaList(removedChecked);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);

    // Debounce the function call
    clearTimeout(titleTimeout);
    titleTimeout = setTimeout(() => firebaseTitle.set(title), 2000);
  };

  return (
    <>
      <List className={classes.root}>
        <input
          type="text"
          value={title}
          placeholder={"Title"}
          onChange={handleTitleChange}
          style={{ border: "none", fontSize: "28px" }}
        />
        {ideasList.map((value, index) => (
          <Paper
            key={index + value}
            className={classes.paper}
            elevation={2}
            style={{ textAlign: "center" }}
          >
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>

      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleIdeaSubmit}
      >
        <Paper
          className={classes.paper}
          elevation={1}
          style={{ textAlign: "center" }}
        >
          <Grid container justify="center" alignItems={"center"}>
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
            <Fab
              aria-label="Delete"
              className={classes.button}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Fab>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  }
});

export default withStyles(styles)(
  withAuthorization(authUser => !!authUser)(IdeaList)
);
