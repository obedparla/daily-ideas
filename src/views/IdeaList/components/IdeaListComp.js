import React from "react";
import PropTypes from "prop-types";

import {
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

export const IdeaListComp = props => {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Write your Daily ideas
      </Typography>
      <TextField
        value={props.title}
        label="Title"
        style={{ margin: 8 }}
        inputProps={{ style: { fontSize: "28px" } }}
        placeholder="Ideas about:"
        fullWidth
        margin="normal"
        onChange={props.handleTitleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {props.ideasList.map((idea, index) => (
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
              onChange={props.handleIdeaEdit}
            />
            <IconButton
              aria-label="Delete"
              className={classes.margin}
              onClick={() => props.handleDelete(idea, index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
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
