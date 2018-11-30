import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpPage = (props) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm {...props}/>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpForm = (props) => {
  const {classes} = props;
  const [formState, setFormState] = useState(INITIAL_STATE);

  const onChange = name => event => {
    setFormState({[name]: event.target.value});
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-username"
          label="Full Name"
          className={classes.textField}
          value={formState.username}
          onChange={onChange('username')}
          margin="normal"
        />
        <TextField
          id="standard-email"
          label="Email Address"
          className={classes.textField}
          value={formState.email}
          onChange={onChange('email')}
          margin="normal"
        />
        <TextField
          id="standard-passwordOne"
          label="Password"
          className={classes.textField}
          value={formState.passwordOne}
          onChange={onChange('passwordOne')}
          margin="normal"
        />
        <TextField
          id="standard-passwordTwo"
          label="Confirm Password"
          className={classes.textField}
          value={formState.passwordTwo}
          onChange={onChange('passwordTwo')}
          margin="normal"
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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