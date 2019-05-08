import React from "react";
import styled, { css } from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

const StyledFab = styled(Fab)`
  ${props => css`
    ${props.theme.mui.breakpoints.down("sm")} {
      width: 54px;
      height: 44px;
    }

    ${props.theme.mui.breakpoints.up("sm")} {
      height: 44px;
      width: 46px;
    }
  `}
`;

export const AddButton = () => (
  <StyledFab color="primary" aria-label="Add Idea" type="submit">
    <AddIcon />
  </StyledFab>
);
