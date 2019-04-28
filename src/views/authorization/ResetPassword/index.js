import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../../../Firebase";
import * as ROUTES from "../../../constants/routes";
import Typography from "@material-ui/core/es/Typography/Typography";
import styled from "styled-components";
import { PaperWrapper } from "../../../components";
import { TextField, Button } from "@material-ui/core";

const INITIAL_STATE = {
  email: "",
  error: null,
};

const PasswordForgetForm = props => {
  const [formState, setFormState] = useState({ ...INITIAL_STATE });
  const firebase = useContext(withFirebase);
  const [error, setError] = useState(null);
  const isInvalid = formState.email === "";

  const onSubmit = event => {
    firebase
      .resetPassword(formState.email)
      .then(() => {
        setFormState({ ...INITIAL_STATE });
      })
      .catch(error => {
        setError({ error });
      });

    event.preventDefault();
  };

  const onChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <PaperWrapper smallWidth flexCentered>
      <Typography component="h1" variant="h5" gutterBottom>
        Forgot Password
      </Typography>

      <form onSubmit={onSubmit}>
        <TextField
          label="Reset password"
          margin="normal"
          variant="outlined"
          name="email"
          value={formState.email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
          fullWidth
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isInvalid}
        >
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    </PaperWrapper>
  );
};

const ResetPassword = styled(Typography)`
  margin-top: 16px;
`;
const PasswordForgetLink = () => (
  <ResetPassword variant={"subheading"} align="center">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </ResetPassword>
);

export default PasswordForgetForm;

export { PasswordForgetForm, PasswordForgetLink };
