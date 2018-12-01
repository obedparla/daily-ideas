import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const SignUpPage = (props) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm {...props}/>
  </div>
);

const SignUpForm = (props) => {
  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const {classes} = props;
  const [formState, setFormState] = useState(INITIAL_STATE);

  const onChange = name => event => {
    setFormState({[name]: event.target.value});
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <Input
          id="standard-username"
          placeholder="Full Name"
          className={classes.textField}
          value={formState.username}
          onChange={onChange('username')}
        />
        <Input
          id="standard-email"
          placeholder="Email Address"
          className={classes.textField}
          value={formState.email}
          onChange={onChange('email')}
        />
        <Input
          id="standard-passwordOne"
          placeholder="Password"
          className={classes.textField}
          value={formState.passwordOne}
          onChange={onChange('passwordOne')}
        />
        <Input
          id="standard-passwordTwo"
          placeholder="Confirm Password"
          className={classes.textField}
          value={formState.passwordTwo}
          onChange={onChange('passwordTwo')}
        />
      </div>
      <div>
        <Button variant="outlined" color="primary" className={classes.button}>
          Primary
        </Button>
      </div>
      {formState.error && <p>{formState.error.message}</p>}
    </form>
  );
}

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

export default withStyles(styles)(SignUpPage);