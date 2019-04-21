import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import { AuthUserContext } from "../../hocs/Session";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../../views/authorization/SignOut";

const Navigation = () => {
  const authUser = useContext(AuthUserContext);

  return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => (
  <>
    <Button color="inherit">
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </Button>
    <Button color="inherit">
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </Button>
    <SignOutButton />
  </>
);

const NavigationNonAuth = () => (
  <>
    <Button color="primary">
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Button>
  </>
);

export default Navigation;
