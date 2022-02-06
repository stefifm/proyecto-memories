import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import useStyles from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../constants/actionType';
import MemoriesText from '../../images/memories-Text.png';
import MemoriesLogo from '../../images/memories-Logo.png';

const Navbar = () => {
  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={MemoriesText} alt="icon" height="45px" />
        <img
          className={classes.image}
          src={MemoriesLogo}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Cerrar Sesion
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Iniciar Sesion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
