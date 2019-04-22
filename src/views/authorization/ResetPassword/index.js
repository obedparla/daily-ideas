import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../../../Firebase";
import * as ROUTES from "../../../constants/routes";
import Typography from "@material-ui/core/es/Typography/Typography";
import styled from "styled-components";

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

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
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={formState.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const ResetPassword = styled(Typography)`
  margin-top: 16px;
`;
const PasswordForgetLink = () => (
  <ResetPassword variant={"subheading"}>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </ResetPassword>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
