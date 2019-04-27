import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { withFirebase } from "../../../Firebase";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { authModalStyles } from "../styles";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
};

const SignUpPage = props => {
  const { classes } = props;

  const [formState, setFormState] = useState({ ...INITIAL_STATE });
  const [error, setError] = useState(null);
  const firebase = useContext(withFirebase);

  const { username, email, passwordOne, } = formState;

  const onChange = name => event => {
    setFormState({ ...formState, [name]: event.target.value });
  };

  const onSubmit = event => {
    firebase
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in Firebase realtime database
        return firebase.user(authUser.user.uid).set({ username, email });
      })
      .then(authUser => {
        setFormState({ ...INITIAL_STATE });
        setError(null);
        props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });

    event.preventDefault();
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={onSubmit}>
          <div>
            <TextField
              required
              id="standard-username"
              label="Full Name"
              className={classes.textField}
              value={formState.username}
              onChange={onChange("username")}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="standard-email"
              label="Email Address"
              className={classes.textField}
              value={formState.email}
              onChange={onChange("email")}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="standard-passwordOne"
              label="Password"
              type="password"
              className={classes.textField}
              value={formState.passwordOne}
              onChange={onChange("passwordOne")}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="standard-passwordTwo"
              label="Confirm Password"
              type="password"
              className={classes.textField}
              value={formState.passwordTwo}
              onChange={onChange("passwordTwo")}
              margin="normal"
              fullWidth
            />
          </div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </div>
          <Link to={ROUTES.SIGN_IN}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.signUpEmail}
            >
              Sign In instead
            </Button>
          </Link>
          {error && <p>{error.message}</p>}
        </form>
      </Paper>
    </main>
  );
};

export default withStyles(authModalStyles)(withRouter(SignUpPage));
