import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { getCurrentDate } from "../../../utils";

const BeforeAfterWrapper = styled.div`
  padding: 10px;
  display: flex;
  background: #fafafa;
  width: 320px;
  justify-content: space-between;
  align-items: center;
  margin: 16px auto 0;
`;

export const BeforeAfter = props => {
  return (
    <BeforeAfterWrapper>
      <Button onClick={props.handleYesterday}>
        <KeyboardArrowLeft />
        Previous
      </Button>
      {props.currentDate}
      <Button
        onClick={props.handleTomorrow}
        disabled={getCurrentDate() === props.currentDate}
      >
        Next
        <KeyboardArrowRight />
      </Button>
    </BeforeAfterWrapper>
  );
};

BeforeAfter.propTypes = {
  handleYesterday: PropTypes.func,
  currentDate: PropTypes.string,
  handleTomorrow: PropTypes.func,
};
