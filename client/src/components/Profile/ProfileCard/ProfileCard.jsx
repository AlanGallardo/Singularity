import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Badge,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import styles from './styles';

const ProfileCard = () => {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = styles();

  const toggleCard = () => setOpen(!open);
  const handleEdit = () => setEditing(!editing);

  return (
    <>
      <div className={classes.toggleCard}>
        <Typography variant="h4">Profile</Typography>
        {open ? <ExpandLess onClick={toggleCard} /> : <ExpandMore onClick={toggleCard} />}
      </div>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card className={classes.card}>
          <CardContent className={classes.profile}>
            <div className={classes.avatarContainer}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<IconButton color="primary"  onClick={handleEdit}> <AddAPhotoIcon /> </IconButton>}
              >
                <Avatar className={classes.avatar} alt={user?.result?.name} src={user?.result?.imageUrl}>
                  <Typography variant="h4">{user?.result?.name.charAt(0)}</Typography>
                </Avatar>
              </Badge>
            </div>
            <div className={classes.textFields}>
              <TextField
                name="name"
                variant="outlined"
                label="Name"
                fullWidth
                disabled={!editing}
              />
              <TextField
                name="email"
                variant="outlined"
                label="Email"
                fullWidth
                disabled={!editing}
              />
              <TextField
                name="password"
                variant="outlined"
                label="Password"
                fullWidth
                disabled={!editing}
              />
            </div>
            <div className={classes.subscribe}>
              <div className={classes.editButton}>
                {!editing && (
                  <>
                    <IconButton color="primary" onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </div>
              <Button style={{ backgroundColor: '#ffc107', marginBottom: '5px' }} variant="contained">
                Subscribe
              </Button>
              <Typography variant="caption">
                Being a singularity subscriber allows you to post articles<br />
                (You need to add a payment method).
              </Typography>
            </div>
          </CardContent>
          <CardActions className={classes.actions}>
            {editing && (
              <>
                <Button color="primary" variant="contained">
                  Save
                </Button>
                <Button color="secondary" variant="contained" onClick={handleEdit}>
                  Cancel
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </Collapse>
    </>
  );
};

export default ProfileCard;
