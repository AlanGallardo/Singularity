import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  InputBase,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import ListItems from './ListItems/ListItems';
import Styles from './styles';
import logo from '../../resources/images/logo.png';
import user from '../../resources/images/user.svg';

const NavBar = () => {
  const classes = Styles();
  const [open, setOpen] = useState(false);

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
        <img src={logo} alt="img" height="50" />
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
          <IconButton edge="end" color="inherit">
            <img src={user} alt="img" height="30" />
          </IconButton>
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