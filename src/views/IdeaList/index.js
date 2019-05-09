import React, { useContext, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import _findIndex from "lodash/findIndex";
import { Typography, Button, Divider, Grid, List } from "@material-ui/core";

import { AuthUserContext, withAuthorization } from "../../hocs/Session";
import withFirebase from "../../Firebase/context";
import { getCurrentDate, formatDate } from "../../utils/dates";
import {
  NewIdeaForm,
  IdeaListComp,
  BeforeAfter,
  ViewTypeSwitch,
} from "./components";
import { PaperWrapper } from "../../components";

let titleTimeout;
// shownDate represents the stable date we use to move from day to day.
const shownDate = new Date();
const IdeaList = props => {
  const { classes } = props;

  const [ideasList, setIdeaList] = useState([]);
  const [deletedIdeas, setDeletedIdeas] = useState([]);
  const [idea, setIdea] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  const authUser = useContext(AuthUserContext);
  const firebase = useContext(withFirebase);
  const userId = authUser.uid;
  const [viewType, setViewType] = useState("chips");

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
      // Only add the current date once.
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
  }, [currentDate]);

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
    console.log("deletedIdeas", deletedIdeas);
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
    const popped = deletedIdeas.shift();
    firebaseIdeas.push({ text: popped.text, createdAt: popped.createdAt });
    setDeletedIdeas([...deletedIdeas]);
  };

  const handleIdeaEdit = e => {
    const index = _findIndex(ideasList, idea => idea.id === e.target.id);
    firebase
      .idea(userId, currentDate, e.target.id)
      .set({ ...ideasList[index], text: e.target.value });
  };

  const handleYesterday = () =>
    setCurrentDate(formatDate(shownDate.setDate(shownDate.getDate() - 1)));
  const handleTomorrow = () =>
    setCurrentDate(formatDate(shownDate.setDate(shownDate.getDate() + 1)));

  return (
    <PaperWrapper loading={loading}>
      <Typography variant="h4" align="center" gutterBottom>
        Write your Daily ideas
      </Typography>
      <Divider variant="middle" />

      <Grid container justify="space-between" className={classes.switchType}>
        <ViewTypeSwitch
          setViewType={props.setViewType}
          viewType={props.viewType}
        />
      </Grid>

      <IdeaListComp
        classes={classes}
        title={title}
        ideasList={ideasList}
        handleTitleChange={handleTitleChange}
        handleIdeaEdit={handleIdeaEdit}
        handleDelete={handleDelete}
        viewType={viewType}
        setViewType={setViewType}
      />
      {deletedIdeas.length > 0 && (
        <Typography align={"right"} gutterBottom>
          <Button variant="outlined" onClick={handleUndoDelete}>
            Undo
          </Button>
        </Typography>
      )}

      <NewIdeaForm
        classes={classes}
        idea={idea}
        ideasList={ideasList}
        handleIdeaSubmit={handleIdeaSubmit}
        handleChange={handleChange}
      />

      <BeforeAfter
        currentDate={currentDate}
        handleTomorrow={handleTomorrow}
        handleYesterday={handleYesterday}
      />
    </PaperWrapper>
  );
};

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  textField: {
    margin: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  switchType: {
    margin: "20px 0 8px",
  },
});

export default withStyles(styles)(
  withAuthorization(authUser => !!authUser)(IdeaList)
);
