import React from "react";
import PropTypes from "prop-types";

import { Grid, Paper, TextField } from "@material-ui/core";
import { IdeaListComp } from "./IdeaListComp";

export const NewIdeaForm = props => {
  const { classes, ideasList } = props;

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={props.handleIdeaSubmit}
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
            value={props.idea}
            onChange={props.handleChange}
            margin="normal"
            variant="outlined"
            multiline
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
  );
};

IdeaListComp.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  ideasList: PropTypes.object,
  handleIdeaSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};
