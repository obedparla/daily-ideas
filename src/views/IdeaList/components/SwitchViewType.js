import React from "react";
import { makeStyles } from "@material-ui/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PropTypes from "prop-types";

export function ViewTypeSwitch(props) {
  const classes = {};

  function handleChange(event) {
    props.setViewType(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">View Type</FormLabel>
        <RadioGroup
          aria-label="Type of view"
          name="view-type"
          className={classes.group}
          value={props.viewType}
          onChange={handleChange}
        >
          <FormControlLabel value="chips" control={<Radio />} label="Chips" />
          <FormControlLabel
            value="text-fields"
            control={<Radio />}
            label="Text Fields"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

ViewTypeSwitch.propTypes = {
  setViewType: PropTypes.func,
  viewType: PropTypes.oneOf(["chips", "text-fields"]),
};
