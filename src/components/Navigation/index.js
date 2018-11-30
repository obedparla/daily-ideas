import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <>
    <Link to={ROUTES.LANDING}>
      <Button color="secondary">Landing</Button>
    </Link>
    <Link to={ROUTES.SIGN_IN}>
      <Button color="secondary">Login</Button>
    </Link>
    <Link to={ROUTES.SIGN_UP}>
      <Button color="secondary">Sign up</Button>
    </Link>
  </>
);

export default Navigation;