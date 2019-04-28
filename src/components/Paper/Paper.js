import React from "react";
import styled, { css } from "styled-components";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";

import { CircularLoader } from "./CircularLoader";

export const StyledPaper = styled(Paper)`
  width: 80%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 40px;

  ${props => css`
    ${props.theme.mui.breakpoints.down("sm")} {
      margin: 0;
      padding: 16px;
      width: auto;
    }
  `}
  
  ${props =>
    props.flexCentered &&
    css`
      display: flex;
      justify-content: center;
    `}

  ${props =>
    props.smallWidth &&
    css`
      width: 400px;
    `}
`;

StyledPaper.propTypes = {
  children: PropTypes.node,
  smallWidth: PropTypes.bool,
  flexCentered: PropTypes.bool,
};

export const PaperWrapper = props => (
  <StyledPaper {...props}>
    {props.loading ? <CircularLoader /> : props.children}
  </StyledPaper>
);

PaperWrapper.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
  smallWidth: PropTypes.bool,
  flexCentered: PropTypes.bool,
};
