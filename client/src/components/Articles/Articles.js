import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Article from './Article/Article';
import Styles from './styles';

const Articles = ({ setCurrentId }) => {
  const articles = useSelector((state) => state.articles);
  const classes = Styles();

  return (
    !articles.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {articles.map((article) => (
          <Grid key={article._id} item xs={12} sm={12} md={6} lg={3}>
            <Article article={article} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Articles;
