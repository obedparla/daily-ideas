import React from "react";
import PropTypes from "prop-types";

import {
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { DenseListItem } from "../../../components";

export const IdeaListComp = props => {
  const { classes } = props;
  const ideaClasses = makeStyles({
    title: {
      marginBottom: "24px",
    },
    titleInput: {
      fontSize: "28px",
    },
  })();

  return (
    <List className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Write your Daily ideas
      </Typography>
      <TextField
        value={props.title}
        label="Title"
        className={ideaClasses.title}
        inputProps={{ className: ideaClasses.titleInput }}
        placeholder="Ideas about:"
        fullWidth
        onChange={props.handleTitleChange}
        InputLabelProps={{
          shrink: true,
        }}
        multiline
      />

      {props.ideasList.map((idea, index) => (
        <Paper key={idea.id} className={classes.paper} elevation={1}>
          <DenseListItem button>
            <TextField
              id={idea.id}
              fullWidth
              className={classes.textField}
              value={idea.text}
              margin="normal"
              variant="outlined"
              onChange={props.handleIdeaEdit}
              multiline
            />
            <IconButton
              aria-label="Delete"
              className={classes.margin}
              onClick={() => props.handleDelete(idea, index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </DenseListItem>
        </Paper>
      ))}
    </List>
  );
};

IdeaListComp.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  handleTitleChange: PropTypes.func,
  ideasList: PropTypes.object,
  handleIdeaEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
