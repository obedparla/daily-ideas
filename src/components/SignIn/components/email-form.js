import { useContext, useState } from 'react';
import withFirebase from '../../../Firebase/context';
import * as ROUTES from '../../../constants/routes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import React from 'react';

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

export default withRouter(SignInFormFunc);
