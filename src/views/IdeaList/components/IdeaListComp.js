import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { DenseListItem } from "../../../components";
import { ViewTypeSwitch } from "./SwitchViewType";

export const IdeaListComp = props => {
  const { classes } = props;
  const ideaClasses = makeStyles({
    title: {
      marginBottom: "24px",
    },
    titleInput: {},
    chips: {
      margin: "8px",
    },
  })();

  return (
    <List className={classes.root}>
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

      <ChipsWrapper>
        {props.ideasList.map((idea, index) => {
          if (props.viewType === "chips") {
            return (
              <StyledChip
                id={idea.id}
                label={idea.text}
                onDelete={() => props.handleDelete(idea, index)}
                variant="outlined"
                color="primary"
                avatar={<Avatar>{index + 1}</Avatar>}
                className={ideaClasses.chips}
              />
            );
          } else {
            return (
              <Paper key={idea.id} className={classes.paper} elevation={1}>
                <DenseListItem button>
                  <TextField
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
            );
          }
        })}
      </ChipsWrapper>
    </List>
  );
};

const ChipsWrapper = styled.div`
  overflow-x: auto;
`;

const StyledChip = styled(Chip)`
  height: auto;

  span {
    white-space: normal;
  }
`;
IdeaListComp.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  handleTitleChange: PropTypes.func,
  ideasList: PropTypes.object,
  handleIdeaEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  viewType: PropTypes.oneOf(["chips", "text-fields"]),
  setViewType: PropTypes.func,
};
