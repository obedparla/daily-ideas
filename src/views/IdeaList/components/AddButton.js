import React from "react";
import styled, { css } from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

const StyledFab = styled(Fab)`
  ${props => css`
    ${props.theme.mui.breakpoints.down("sm")} {
      position: fixed;
      bottom: ${props.theme.mui.spacing.unit * 2}px;
      right: ${props.theme.mui.spacing.unit * 2}px;
    }
    ${props.theme.mui.breakpoints.up("sm")} {
      width: 44px;
      height: 44px;

      svg {
        font-size: 20px;
      }
    }
  `}
`;

export const AddButton = () => (
  <StyledFab color="primary" aria-label="Add Idea" type="submit">
    <AddIcon />
  </StyledFab>
);
