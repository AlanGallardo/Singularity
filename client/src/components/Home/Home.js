import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'; 
import { Container, Grow, Grid, Paper } from '@material-ui/core';

import { getArticles } from '../../actions/articles';
import Pagination from '../Pagination/Pagination';
import Articles from '../Articles/Articles';
import Form from '../Form/Form';
import Styles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const classes = Styles();

  useEffect(() => {
    dispatch(getArticles());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Articles setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );

}

export default Home;
