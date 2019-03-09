import React, { useContext, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import _findIndex from "lodash/findIndex";

import { Delete as DeleteIcon } from "@material-ui/icons";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";

import { AuthUserContext, withAuthorization } from "../Session";
import withFirebase from "../../Firebase/context";
import { getCurrentDate } from "../../utils/dates";

const currentDate = getCurrentDate();
let titleTimeout;

const IdeaList = props => {
  const { classes } = props;

  const [ideasList, setIdeaList] = useState([]);
  const [deletedIdeas, setDeletedIdeas] = useState([]);
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
    firebaseIdeas.orderByChild("createdAt").on("value", snapshot => {
      let ideaList = [];
      snapshot.forEach(function(child) {
        ideaList.push({ ...child.val(), id: child.key });
      });
      if (ideaList.length > 0) {
        setIdeaList([...ideaList]);
        firebaseIdeasCount.set(ideaList.length);
        setLoading(false);
      } else {
        setIdeaList([]);
        setLoading(false);
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
          ideasCount: 0,
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
    if (idea) {
      firebaseIdeas.push({
        text: idea,
        createdAt: firebase.serverValue.TIMESTAMP,
      });
      setIdea("");
    }
  };

  // Delete an item, no need to update state as useEffect does it.
  const handleDelete = idea => {
    setDeletedIdeas([...deletedIdeas, { ...idea }]);
    setTimeout(
      () =>
        setDeletedIdeas(
          deletedIdeas.filter(deletedIdea => deletedIdea.id !== idea.id)
        ),
      5000
    );
    firebase.idea(userId, currentDate, idea.id).remove();
  };

  const handleTitleChange = e => {
    const value = e.target.value;
    setTitle(value);
    // Debounce the function call
    clearTimeout(titleTimeout);
    titleTimeout = setTimeout(() => firebaseTitle.set(value), 1000);
  };

  const handleUndoDelete = () => {
    const popped = deletedIdeas.pop();
    firebaseIdeas.push({ text: popped.text, createdAt: popped.createdAt });

    setDeletedIdeas([...deletedIdeas]);
  };

  const handleIdeaEdit = e => {
    const index = _findIndex(ideasList, idea => idea.id === e.target.id);
    firebase
      .idea(userId, currentDate, e.target.id)
      .set({ ...ideasList[index], text: e.target.value });
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <List className={classes.root}>
            <Typography variant="h4" gutterBottom>
              Write your Daily ideas
            </Typography>
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
                shrink: true,
              }}
            />

            {ideasList.map((idea, index) => (
              <Paper
                key={idea.id}
                className={classes.paper}
                elevation={2}
                style={{ textAlign: "center" }}
              >
                <ListItem dense button>
                  <TextField
                    id={idea.id}
                    fullWidth
                    className={classes.textField}
                    value={idea.text}
                    margin="normal"
                    variant="outlined"
                    onChange={handleIdeaEdit}
                  />
                  <IconButton
                    aria-label="Delete"
                    className={classes.margin}
                    onClick={() => handleDelete(idea, index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              </Paper>
            ))}
          </List>

          {deletedIdeas.length > 0 && (
            <Typography align={"right"} gutterBottom>
              <Button variant="outlined" onClick={handleUndoDelete}>
                Undo
              </Button>
            </Typography>
          )}

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

export default withStyles(styles)(
  withAuthorization(authUser => !!authUser)(IdeaList)
);
