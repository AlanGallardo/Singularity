import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Backdrop,
  Button,
  Badge,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Divider,
  Fade,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
  Paper,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import { updateUser } from '../../../actions/auth';
import styles from './styles';

const ProfileCard = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [userData, setUserData] = useState({
    name: user?.result?.name,
    email: user?.result?.email,
  });
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const creditCard = useSelector(
    (state) => state.creditCard.creditCard.find((c) => c.user === user?.result?.name.replace(/\s+/g, ''))
  );
  const classes = styles();

  /*useEffect(() => {
    if(user) setUserData(user.result);
  }, [user]);*/

  const handleSubscribtion = () => {
    if (user?.result?._id) {
      dispatch(updateUser(user?.result?._id, { ...userData, isPremium: true }));
    }
  };

  const handleChange = () => {
    dispatch(updateUser(user?.result?._id, { ...userData }));
  }

  const toggleCard = () => setOpen(!open);
  const handleDialog = () => setOpenDialog(!openDialog);
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
                badgeContent={<IconButton color="primary" onClick={handleEdit} disabled={user?.result?.googleId}> <AddAPhotoIcon /> </IconButton>}
              >
                <Avatar className={classes.avatar} alt={user?.result?.name} src={user?.result?.imageUrl}>
                  <Typography variant="h3">{user?.result?.name.charAt(0)}</Typography>
                </Avatar>
              </Badge>
            </div>
            <div className={classes.textFields}>
              <TextField
                name="name"
                variant="outlined"
                placeholder="Name"
                label="Name"
                fullWidth
                value={userData.name}
                disabled={!editing}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <TextField
                name="email"
                variant="outlined"
                placeholder="Email"
                label="Email"
                fullWidth
                value={userData.email}
                disabled={!editing}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div className={classes.subscribe}>
              <div className={classes.editButton}>
                {!editing && (
                  <>
                    <Tooltip title={user?.result?.googleId ? 'Cannot edit a Google user' : ''} placement="left">
                      <span>
                        <IconButton color="primary" onClick={handleEdit} disabled={user?.result?.googleId}>
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </>
                )}
              </div>
              <Button
                style={{ backgroundColor: '#ffc107', marginBottom: '5px' }}
                variant="contained"
                disabled={!creditCard}
                onClick={handleDialog}
              >
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
                <Button color="primary" variant="contained" onClick={handleChange}>
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
      <Modal
        open={openDialog}
        closeAfterTransition
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, }}
      >
        <Fade in={openDialog}>
          <Paper className={classes.paper}>
            <div className={classes.dialogText}>
              <Typography variant="h5">Becoming a premium user</Typography>
              <Typography variant="body1">
                Being a singularity premium user allows you to post articles.<br />
                By clicking 'Save' you consent a monthly fee of 1'99€
              </Typography>
            </div>
            <div className={classes.dialogButtons}>
              <Button color="secondary" variant="contained" onClick={handleDialog} style={{ marginRight: '10px' }}>
                Cancel
              </Button>
              <Button color="primary" variant="contained">
                Save
              </Button>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default ProfileCard;
