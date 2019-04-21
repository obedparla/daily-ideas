import styled from "styled-components";
import PropTypes from "prop-types";
import { ListItem } from "@material-ui/core";

export const DenseListItem = styled(ListItem)`
  padding: 0 8px 0 0;
  margin-bottom: 5px;
  cursor: default;

  &:hover {
    background-color: inherit;
  }
`;

DenseListItem.PropTypes = {
  children: PropTypes.node,
};
DenseListItem.displayName = "DenseListItem";
