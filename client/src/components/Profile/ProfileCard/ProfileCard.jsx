import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import FileBase from 'react-file-base64';

import { updateUser } from '../../../actions/auth';
import styles from './styles';

const ProfileCard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [userData, setUserData] = useState({
    name: user?.result?.name,
    email: user?.result?.email,
    imageUrl: user?.result?.imageUrl,
  });
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const creditCard = useSelector(
    (state) => state.creditCard.creditCard.find((c) => c.user === user?.result?.name.replace(/\s+/g, ''))
  );
  const classes = styles();

  const handleChange = () => {
    dispatch(updateUser(user?.result?._id, { ...userData }));
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  }

  const handlePremium = () => {
    dispatch(updateUser(user?.result?._id, { ...userData, isPremium: !user?.result?.isPremium }));
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
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
              <Avatar className={classes.avatar} alt={user?.result?.name} src={user?.result?.imageUrl}>
                <Typography variant="h3">{user?.result?.name.charAt(0)}</Typography>
              </Avatar>
              {editing && (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setUserData({ ...userData, imageUrl: base64 })}
                />
              )}
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
                style={{ backgroundColor: user?.result?.isPremium ? '#dc3545' : '#ffc107', marginBottom: '5px' }}
                variant="contained"
                disabled={!creditCard}
                onClick={handleDialog}
              >
                {user?.result?.isPremium ? 'Remove subscription' : 'Subscribe'}
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
              <Typography variant="h5">{user?.result?.isPremium ? 'Removing subscription' : 'Becoming a premium user'}</Typography>
              <Typography variant="body1">
                {user?.result?.isPremium ? (
                  <Typography variant="body2">
                    Are you sure that you want to remove your subscription?<br />
                    You won't be able to post articles.
                </Typography>
                ) : (
                  <Typography variant="body2">
                    Being a singularity premium user allows you to post articles.<br />
                      By clicking 'Save' you consent a monthly fee of 1'99€.
                  </Typography>
                )}
                
              </Typography>
            </div>
            <div className={classes.dialogButtons}>
              <Button color="secondary" variant="contained" onClick={handleDialog} style={{ marginRight: '10px' }}>
                Cancel
              </Button>
              <Button color="primary" variant="contained" onClick={handlePremium}>
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
