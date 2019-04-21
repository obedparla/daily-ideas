import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../../Firebase";

const SignOutButton = () => {
  const firebase = useContext(withFirebase);

  return (
    <Button type="button" onClick={firebase.signOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
