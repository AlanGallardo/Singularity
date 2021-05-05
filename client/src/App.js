import React, { useState, useEffect } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getArticles } from './actions/articles';
import Articles from './components/Articles/Articles';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import Styles from './styles';

const App = () => {
  const [ currentId, setCurrentId ] = useState(null);
  const dispatch = useDispatch();
  const classes = Styles();

  useEffect(() => {
    dispatch(getArticles);
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="xl">
      <NavBar />
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Articles setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;