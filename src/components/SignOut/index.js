import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "../../Firebase";

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);

  return (
    <Button type="button" onClick={firebase.signOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
