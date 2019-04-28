import React from 'react';
import styled, {css} from 'styled-components';
import AddIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { Fab } from '@material-ui/core';

const StyledFab = styled(Fab)`
  ${props => css`
    ${props.theme.mui.breakpoints.down('sm')}{
      position: absolute;
      bottom: ${props.theme.mui.spacing.unit}px;
      right: ${props.theme.mui.spacing.unit * 2}px;
    }
  `}
`
const AddButton = () => (
  <StyledFab color="primary" aria-label="Add Idea">
    <AddIcon />
  </StyledFab>
);
export default AddButton;
