import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Avatar,
  Card,
  Chip,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Tooltip
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import moment from 'moment';
import parse from 'html-react-parser';

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
  }, [id, dispatch]);

  if (!article) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedArticles = articles.filter(({ _id }) => _id !== article._id);

  const openArticle = (_id) => history.push(`/articles/${_id}`);

  return (
    <Paper className={classes.container} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <div className={classes.header}>
            <Typography variant="h2" component="h2">{article.title}</Typography>
            <Tooltip title={article.name} placement="bottom">
              <Avatar alt={article.name} src={article.authorImage} className={classes.avatar}>
                <Typography variant="h4">{article.name.charAt(0)}</Typography>
              </Avatar>
            </Tooltip>
          </div>
          <div className={classes.tagsContainer}>
            {article.tags.map((tag) => <Chip className={classes.tag} color="default" size="small" label={tag} />)}
          </div>
          <Typography variant="caption" style={{ marginLeft: '12px' }}>{moment(article.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="p" style={{ marginLeft: '12px' }}>{parse(article.description)}</Typography>
        </div>
        <div className={classes.rightSection}>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={article.bannerImage || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
              alt={article.title}
            />
          </div>
          {recommendedArticles.length ? (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">You might also like:</Typography>
              <Divider />
              <div className={classes.recommendedArticles}>
                {recommendedArticles.slice(0, 5).map(({ title, authorImage, description, likes, bannerImage, _id }) => (
                  <Card className={classes.recommendedArticle} raised elevation={5} onClick={() => openArticle(_id)} key={_id}>
                    <img src={bannerImage} width="250px" />
                    <div className={classes.recommendedInfo}>
                      <div className={classes.recommendedTitle}>
                        <Avatar src={authorImage} className={classes.smallAvatar} />
                        <Typography gutterBottom variant="body1">{title}</Typography>
                      </div>
                      <Typography gutterBottom variant="body2">{parse(description.substring(0, description.indexOf('.') + 1))}</Typography>
                      <span className={classes.recommendedLikes}>
                        <ThumbUpAltIcon fontSize="small" />
                        <Typography gutterBottom variant="subtitle2">&nbsp;{likes.length}</Typography>
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : ''}
        </div>
      </div>
    </Paper>
  );
};

export default ArticleDetails;
