import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import parse from 'html-react-parser';

import { deleteArticle, likeArticle } from '../../../actions/articles';
import loginImage from '../../../images/login.svg';
import Styles from './styles';

const Article = ({ article, setCurrentId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = Styles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (article.likes.length > 0) {
      return article.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{article.likes.length > 2 ? `You and ${article.likes.length - 1} others` : `${article.likes.length} like${article.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{article.likes.length} {article.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const closeArticleMenu = (e, id) => {
    if (e.currentTarget.id === 'edit')
      setCurrentId(id);
    if (e.currentTarget.id === 'delete')
      dispatch(deleteArticle(id));

    setAnchorEl(null);
  }

  const openPost = () => history.push(`/articles/${article._id}`);

  const tooltipLikeTitle = () => {
    if(user?.result?.googleId === article?.author || user?.result?._id === article?.author)
      return 'You cannot like your own articles';
    else if(user?.result?.googleId || user?.result?._id)
      return 'Like Article';
    else
      return 'Sign In to like articles';
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={article.bannerImage} title={article.title} />
        <div className={classes.overlay}>
          <Typography variant="h6" className={classes.author}>{article.name}</Typography>
          <Typography variant="caption">{moment(article.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.infoCard}>
          <Avatar alt={article.author} src={article?.authorImage ?? loginImage} className={classes.avatar} />
          <div className={classes.tagsContainer}>
            {article.tags.map((tag) => (
              <Chip className={classes.tag} color="default" size="small" label={tag} />
            ))}
          </div>
        </div>
        <Typography className={classes.title} variant="h6">{article.title}</Typography>
        <CardContent>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
          >
            {parse(article.description.substring(0, 128))}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Tooltip title={tooltipLikeTitle()} placement="right">
          <span>
            <Button
              size="small"
              color="primary"
              disabled={!user?.result || (user?.result?.googleId === article?.author || user?.result?._id === article?.author)}
              onClick={() => dispatch(likeArticle(article._id))}
            >
              <Likes />
            </Button>
          </span>
        </Tooltip>
        {(user?.result?.googleId === article?.author || user?.result?._id === article?.author) && (
          <div className={classes.actions}>
            <Tooltip title="Edit Article" placement="top">
              <IconButton
                color="primary"
                disabled={!user?.result}
                onClick={() => setCurrentId(article._id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Article" placement="top">
              <IconButton
                color="primary"
                disabled={!user?.result}
                onClick={() => dispatch(deleteArticle(article._id))}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </CardActions>
    </Card>
  );
}

export default Article;
