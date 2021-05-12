import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import Input from './Input';
import Styles from './styles';

const Auth = () => {
  const classes = Styles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => setIsSignup((prevIsSignup) => !prevIsSignup);

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  autoFocus
                  half
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  half
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup &&
              <Input
                name="confirm"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
              />
            }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="471845737191-l0vnistlu7onppeg65idbscegjm75ef2.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                variant="contained"
                fullWidth
                startIcon={<Icon />}
                disabled={renderProps.disabled}
                onClick={renderProps.onClick}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
