import React, { useState } from 'react';
import {
  Backdrop,
  Collapse,
  Fade,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KeyboardReturnOutlinedIcon from '@material-ui/icons/KeyboardReturnOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import CloseIcon from '@material-ui/icons/Close';

import Form from '../../Form/Form';
import Styles from './styles';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const classes = Styles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const libraryChilds = [
    {
      name: 'Solar System',
      sendTo: '',
      disabled: false,
    },
    {
      name: 'Astrophysicists',
      sendTo: '',
      disabled: false,
    },
  ];

  const toggleList = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpenForm(true)
  };

  const handleClose = () => {
    setOpenForm(false)
  };

  return (
    <List
      component="nav"
      className={classes.root}
      subheader={
        <ListSubheader id="options-list" className={classes.subheader} component="div">
          OPTIONS
          <ListItem button className={classes.closeDrawer}>
            <KeyboardReturnOutlinedIcon />
          </ListItem>
        </ListSubheader>
      }
    >
      <ListItem button>
        <ListItemIcon>
          <AccountBoxOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>

      <ListItem button disabled={!(user?.result?.googleId || user?.result?._id)} onClick={handleOpen}>
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
            <CloseIcon className={classes.closeButton} onClick={handleClose} />
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Paper>
        </Fade>
      </Modal>

      <ListItem button onClick={toggleList}>
        <ListItemIcon>

        </ListItemIcon>
        <ListItemText primary="Library" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {libraryChilds.map((item) => (
          <ListItem button className={classes.child} disabled={item.disabled}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <ForumOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Forum" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <RecordVoiceOverOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Authors" />
      </ListItem>
    </List>
  );
}

export default NavBar;