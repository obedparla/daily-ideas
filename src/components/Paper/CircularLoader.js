import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

export const CircularLoader = () => {
  return (
    <Grid container justify="center">
      <CircularProgress />
    </Grid>
  );
};
