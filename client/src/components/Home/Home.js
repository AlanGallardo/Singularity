import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, TextField, Button, Container, Grow, Grid, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Pagination from '../Pagination/Pagination';
import Articles from '../Articles/Articles';
import Styles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get('page') || 1;
  const classes = Styles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9} lg={12}>
            <Articles setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={12}>
            <Paper className={classes.pagination}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );

}

export default Home;
