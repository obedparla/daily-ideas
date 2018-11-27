import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <>
    <Link to={ROUTES.LANDING}>
      <Button color="inherit">Landing</Button>
    </Link>
    <Button color="inherit">Login</Button>
  </>
);

export default Navigation;