import React, { useContext, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  CircularProgress,
  Typography
} from "@material-ui/core";

import { AuthUserContext, withAuthorization } from "../Session";
import withFirebase from "../../Firebase/context";
import { getCurrentDate } from "../../utils/dates";

const currentDate = getCurrentDate();
let titleTimeout;

const IdeaList = props => {
  const { classes } = props;

  const [ideasList, setIdeaList] = useState([]);
  const [idea, setIdea] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const authUser = useContext(AuthUserContext);
  const firebase = useContext(withFirebase);
  const userId = authUser.uid;

  const firebaseIdeas = firebase.ideas(userId, currentDate);
  const firebaseTitle = firebase.ideaTitle(userId, currentDate);
  const firebaseIdeaStats = firebase.ideaStats(userId, currentDate);
  const firebaseIdeasCount = firebase.ideaStatsCount(userId, currentDate);

  useEffect(() => {
    firebaseIdeas.on("value", snapshot => {
      const ideas = snapshot.val();
      if (ideas) {
        // Populate the list by going through the data we get from firebase db
        const ideasList = Object.keys(ideas).map(key => ({
          text: ideas[key].text,
          id: key
        }));
        setIdeaList([...ideasList]);
        setLoading(false);
        firebaseIdeasCount.set(ideasList.length);
      } else {
        setLoading(false);
        setIdeaList([]);
      }
    });

    firebaseTitle.once("value", snapshot => setTitle(snapshot.val()));
    // Save the current date in a different object. Useful for filtering, pagination, etc
    firebaseIdeaStats.once("value", snapshot => {
      const ideaStatsObj = snapshot.val();
      // Onlyn add the current date once.
      if (ideaStatsObj && ideaStatsObj.date !== currentDate) {
        firebaseIdeaStats.set({
          createdAt: firebase.serverValue.TIMESTAMP,
          date: currentDate,
          ideasCount: 0
        });
      }
    });

    return () => {
      firebaseIdeas.off();
    };
  }, []);

  const handleChange = event => {
    setIdea(event.target.value);
  };

  const handleIdeaSubmit = event => {
    event.preventDefault();
    firebaseIdeas.push({
      text: idea,
      createdAt: firebase.serverValue.TIMESTAMP
    });
    setIdea("");
  };

  // Delete an item, no need to update state as useEffect does it.
  const handleDelete = ideaId =>
    firebase.idea(userId, currentDate, ideaId).remove();

  const handleTitleChange = e => {
    const value = e.target.value;
    setTitle(value);
    // Debounce the function call
    clearTimeout(titleTimeout);
    titleTimeout = setTimeout(() => firebaseTitle.set(value), 1000);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <List className={classes.root}>
            <TextField
              value={title}
              label="Title"
              style={{ margin: 8 }}
              inputProps={{ style: { fontSize: "28px" } }}
              placeholder="Ideas about:"
              fullWidth
              margin="normal"
              onChange={handleTitleChange}
              InputLabelProps={{
                shrink: true
              }}
            />

            <Typography variant="h3">Today</Typography>
            {ideasList.map(idea => (
              <Paper
                key={idea.id}
                className={classes.paper}
                elevation={2}
                style={{ textAlign: "center" }}
              >
                <ListItem role={undefined} dense button>
                  <ListItemText primary={idea.text} />
                  <IconButton
                    aria-label="Delete"
                    className={classes.margin}
                    onClick={() => handleDelete(idea.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
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
              style={{ textAlign: "center", marginBottom: "24px" }}
            >
              <Grid container justify="center" alignItems={"center"}>
                <TextField
                  id="outlined-name"
                  label="Ideas"
                  fullWidth
                  className={classes.textField}
                  value={idea}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                {ideasList.length < 10 ? (
                  <>
                    <div>You've added {ideasList.length} ideas so far!</div>
                    <div>Try adding {10 - ideasList.length} more!</div>
                  </>
                ) : (
                  <div>You've added {ideasList.length} ideas, well done!</div>
                )}
              </Grid>
            </Paper>
          </form>
        </>
      )}
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
