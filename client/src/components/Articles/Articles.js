import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid, CircularProgress } from '@material-ui/core';

import { getArticlesBySearch } from '../../actions/articles';
import Article from './Article/Article';
import Styles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
};

const Articles = ({ setCurrentId }) => {
  const { articles, isLoading } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const classes = Styles();

  useEffect(() => {
    if(searchQuery) dispatch(getArticlesBySearch(searchQuery));
  }, [dispatch, searchQuery]);

  if(!articles) return 'No articles';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container spacing={3}>
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
