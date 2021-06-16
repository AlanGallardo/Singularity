import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Backdrop,
  Fade,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import KeyboardReturnOutlinedIcon from '@material-ui/icons/KeyboardReturnOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import CloseIcon from '@material-ui/icons/Close';

import Form from '../Form/Form';
import Search from '../Search/Search';
import Styles from './styles';
import logo from '../../images/logo.svg';
import loginImage from '../../images/login.svg';

const NavBar = () => {
  const classes = Styles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleForm = () => {
    setOpenForm(!openForm)
  };

  const openProfile = () => {
    setOpen(false);
    history.push(user ? `/profile/${(user?.result?.name).replace(/ +/g, "")}` : '/auth');
  }

  const openForum = () => {
    setOpen(false);
    history.push('/forum');
  }

  const openAuthors = () => {
    setOpen(false);
  }

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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} classes={{ paper: classes.drawer }}>
          <List
            component="nav"
            className={classes.root}
            subheader={
              <ListSubheader id="options-list" className={classes.subheader} component="div">
                OPTIONS
                <ListItem button className={classes.closeDrawer} onClick={toggleDrawer(false)}>
                  <KeyboardReturnOutlinedIcon />
                </ListItem>
              </ListSubheader>
            }
          >
            <ListItem button onClick={openProfile}>
              <ListItemIcon>
                <AccountBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem button disabled={!(user?.result?.googleId || user?.result?.isPremium)} onClick={handleForm}>
              <ListItemIcon>
                <PostAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Post an article" />
            </ListItem>

            <Modal
              open={openForm}
              closeAfterTransition
              className={classes.modal}
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500, }}
            >
              <Fade in={openForm}>
                <Paper className={classes.paper}>
                  <CloseIcon className={classes.closeButton} onClick={handleForm} />
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Paper>
              </Fade>
            </Modal>

            <ListItem button onClick={openForum}>
              <ListItemIcon>
                <ForumOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItem>

            <ListItem button onClick={openAuthors}>
              <ListItemIcon>
                <RecordVoiceOverOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Authors" />
            </ListItem>
          </List>
        </Drawer>
        <Avatar component={Link} to="/" variant="square" src={logo} />
        <Search />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Tooltip title="Demo Video" placement="left">
            <a href="https://youtu.be/HyXJIog1YF8" target="_blank">
              <Avatar className={classes.options}><YouTubeIcon /></Avatar>
            </a>
          </Tooltip>
          <Tooltip title={"Linkedin Profile"} placement="left">
            <a href="https://www.linkedin.com/in/alangallardoclemente/" target="_blank">
              <Avatar className={classes.options}><LinkedInIcon /></Avatar>
            </a>
          </Tooltip>

          <Tooltip title={"Login/Logout"} placement="bottom">
            <IconButton edge="end" color="inherit" onClick={openLoginMenu}>
              {user ? (
                <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              ) : (
                <img src={loginImage} alt="img" height="30" className={classes.loginImage} />
              )}
            </IconButton>
          </Tooltip>

          <Menu
            id="article-menu"
            open={openMenu}
            anchorEl={anchorEl}
            onClose={closeLoginMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
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