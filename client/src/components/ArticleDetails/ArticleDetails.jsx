import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import { getArticle } from '../../actions/articles';
import Styles from './styles';

const ArticleDetails = () => {
  const { article, articles, isLoading } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = Styles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getArticle(id));
  }, [id]);

  if(!article) return null;

  if(isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper className={classes.container} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{article.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{article.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{article.description}</Typography>
          <Typography variant="h6">Created by: {article.name}</Typography>
          <Typography variant="body1">{moment(article.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={article.bannerImage || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            alt={article.title}
          />
        </div>
      </div>
    </Paper>
  );
};

export default ArticleDetails;
