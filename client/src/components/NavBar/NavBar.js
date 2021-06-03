import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import ListItems from './ListItems/ListItems';
import Search from '../Search/Search';
import Styles from './styles';
import logo from '../../images/logo.png';
import loginImage from '../../images/login.svg';

const NavBar = () => {
  const classes = Styles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  const openLoginMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeLoginMenu = () => {
    setAnchorEl(null);
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={toggleDrawer} classes={{ paper: classes.drawer }}>
          <ListItems />
        </Drawer>
        <Avatar component={Link} to="/" variant="square" src={logo} />
        <Search />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <a href="https://www.linkedin.com/in/alangallardoclemente/" target="_blank">
            <Avatar className={classes.options}><YouTubeIcon /></Avatar>
          </a>
          <a href="https://www.linkedin.com/in/alangallardoclemente/" target="_blank">
            <Avatar className={classes.options}><LinkedInIcon /></Avatar>
          </a>

          <IconButton edge="end" color="inherit" onClick={openLoginMenu}>
            {user ? (
              <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            ) : (
              <img src={loginImage} alt="img" height="30" />
            )}
          </IconButton>

          <Menu
            id="article-menu"
            open={openMenu}
            anchorEl={anchorEl}
            onClose={closeLoginMenu}
          >

            {user ? (
              <MenuItem key="logout" id="login" onClick={logout}>
                <ExitToAppOutlinedIcon fontSize="small" />
                Logout
              </MenuItem>
            ) : (
              <MenuItem key="login" id="login" component={Link} to="/auth" onClick={closeLoginMenu}>
                <ExitToAppOutlinedIcon fontSize="small" />
                Login
              </MenuItem>
            )}

          </Menu>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;