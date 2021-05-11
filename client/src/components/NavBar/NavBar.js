import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import ListItems from './ListItems/ListItems';
import Styles from './styles';
import logo from '../../resources/images/logo.png';
import loginImage from '../../resources/images/login.svg';

const NavBar = () => {
  const classes = Styles();
  const [ open, setOpen ] = useState(false);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const openMenu = Boolean(anchorEl);
  const user = null;

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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search for articles"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Button className={classes.options}>About Me</Button>
          <Button className={classes.options}>Contact</Button>

          <IconButton edge="end" color="inherit" onClick={openLoginMenu}>
            {user ? (
              <Avatar className="O" alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
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
              <MenuItem key="login" id="login" onClick={closeLoginMenu}>
                <ExitToAppOutlinedIcon fontSize="small" />
                Logout
              </MenuItem>
            ) : (
              <MenuItem key="login" id="login" component={Link} to="/auth">
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