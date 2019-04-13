import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

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

  const { username, email, passwordOne, passwordTwo } = formState;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

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
      <CssBaseline />
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
          {error && <p>{error.message}</p>}
        </form>
      </Paper>
    </main>
  );
};

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  facebook: {
    marginTop: theme.spacing.unit * 2,
    background: "#3a579a",
  },
  google: {
    marginTop: theme.spacing.unit * 2,
    background: "#4285F4",
  },
});

export default withStyles(styles)(withRouter(SignUpPage));
