import React, {useContext, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {withFirebase} from '../../Firebase';
import {SignUpLink} from '../SignUp';

const SignInPage = (props) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm {...props}/>
    <SignUpLink/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
};

const SignInFormFunc = (props) => {
  const {classes} = props;
  const [formState, setFormState] = useState({...INITIAL_STATE});
  const [error, setError] = useState(null);
  const firebase = useContext(withFirebase);

  const {email, passwordOne } = formState;

  const isInvalid = !passwordOne || !email;

  const onChange = name => event => {
    setFormState({...formState, [name]: event.target.value});
  };

  const onSubmit = event => {
    firebase.signInWithEmailAndPassword(email, passwordOne)
      .then(() => {
        setFormState({...INITIAL_STATE});
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
      </div>
      <div>
        <Button disabled={isInvalid} type={'submit'} variant="outlined" color="primary" className={classes.button}>
          Sign In
        </Button>
      </div>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = withRouter(SignInFormFunc);

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

export default withStyles(styles)(SignInPage);