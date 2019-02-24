import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {SignUpLink} from '../SignUp';
import { PasswordForgetLink } from '../ResetPassword';
import {SignInForm, SignInGoogle} from './components';

const SignInPage = (props) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm {...props}/>
    <SignInGoogle />
    {/*<SignInFacebook />*/}

    <SignUpLink/>
    <PasswordForgetLink />
  </div>
);

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