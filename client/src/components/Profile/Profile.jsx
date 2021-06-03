import React from 'react';
import {
  Paper,
} from '@material-ui/core';

import ProfileCard from './ProfileCard/ProfileCard';
import PostedArticlesCard from './PostedArticlesCard/PostedArticlesCard';
import PaymentMethodCard from './PaymentMethodCard/PaymentMethodCard';
import styles from './styles';

const Profile = () => {
  const classes = styles();

  return (
    <Paper className={classes.container} elevation={6}>
      <ProfileCard />
      <PostedArticlesCard />
      <PaymentMethodCard />
    </Paper>
  );
};

export default Profile;
