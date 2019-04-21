import React from "react";
import { Typography } from "@material-ui/core";

const LandingPage = props => {
  return (
    <>
      <Typography variant={"h1"} gutterBottom>
        Weldome to Daily Ideas
      </Typography>
      <Typography variant={"body1"} gutterBottom>
        Daily Ideas has a simple premise: you will become smarter, more creative
        and with a more agile mind by writing 10 or more ideas every day.
      </Typography>
      <Typography variant={"body1"} gutterBottom>
        By writing 10+ ideas on different topics daily, you're exercising your
        mind the same way you'd be exercising your body at the gym.
      </Typography>
    </>
  );
};

export default LandingPage;
