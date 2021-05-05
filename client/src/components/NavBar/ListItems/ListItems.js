import React, { useState } from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KeyboardReturnOutlinedIcon from '@material-ui/icons/KeyboardReturnOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

import Styles from './styles';

const NavBar = () => {
  const classes = Styles();
  const [open, setOpen] = useState(false);
  const summaryChilds = [
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

      <ListItem button disabled>
        <ListItemIcon>
          <PostAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Post an article" />
      </ListItem>

      <ListItem button onClick={toggleList}>
        <ListItemIcon>

        </ListItemIcon>
        <ListItemText primary="Summary" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {summaryChilds.map((item) => (
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