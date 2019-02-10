import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../Firebase';

const SignUpPage = props => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm {...props} />
  </div>
);
export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: ''
};

const SignUpFunc = props => {
  const { classes } = props;

  const [formState, setFormState] = useState({ ...INITIAL_STATE });
  const [error, setError] = useState(null);
  const firebase = useContext(withFirebase);

  const { username, email, passwordOne, passwordTwo } = formState;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

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
    <form className={classes.container} onSubmit={onSubmit}>
      <div>
        <TextField
          required
          id="standard-username"
          label="Full Name"
          className={classes.textField}
          value={formState.username}
          onChange={onChange('username')}
          margin="normal"
        />
        <TextField
          required
          id="standard-email"
          label="Email Address"
          className={classes.textField}
          value={formState.email}
          onChange={onChange('email')}
          margin="normal"
        />
        <TextField
          required
          id="standard-passwordOne"
          label="Password"
          type="password"
          className={classes.textField}
          value={formState.passwordOne}
          onChange={onChange('passwordOne')}
          margin="normal"
        />
        <TextField
          required
          id="standard-passwordTwo"
          label="Confirm Password"
          type="password"
          className={classes.textField}
          value={formState.passwordTwo}
          onChange={onChange('passwordTwo')}
          margin="normal"
        />
      </div>
      <div>
        <Button
          disabled={isInvalid}
          type={'submit'}
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Sign Up
        </Button>
      </div>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpForm = withRouter(SignUpFunc);

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    margin: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

export default withStyles(styles)(SignUpPage);
