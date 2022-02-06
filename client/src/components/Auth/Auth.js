import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container
} from '@mui/material';

import { GoogleLogin } from 'react-google-login';

import useStyles from './styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Input } from './Input';
import Icon from './icon';

import { signin, signup } from '../../actions/auth.actions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export const Auth = () => {
  const classes = useStyles();

  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log('No se pudo iniciar sesion con Google. Intente mas tarde');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? 'Registrarse' : 'Iniciar Sesion'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="Nombre"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Apellido"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Contrasena"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirmar Contrasena"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? 'Registrarse' : 'Iniciar Sesion'}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_AUTH}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                  sx={{ ml: 2, mt: 0.5 }}
                >
                  INICIO DE SESION CON GOOGLE
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Tienes una cuenta? Inicia Sesion'
                  : 'No tienes una cuenta? Registrarse'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
