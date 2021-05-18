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
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { deleteArticle, likeArticle } from '../../../actions/articles';
import loginImage from '../../../resources/images/login.svg';
import Styles from './styles';

const Article = ({ article, setCurrentId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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

  const openArticleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeArticleMenu = (e, id) => {
    if (e.currentTarget.id === 'edit')
      setCurrentId(id);
    if (e.currentTarget.id === 'delete')
      dispatch(deleteArticle(id));

    setAnchorEl(null);
  }

  const openPost = () => history.push(`/articles/${article._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={article.bannerImage} title={article.title} />
        <div className={classes.overlay}>
          <Typography variant="h6" className={classes.author}>{article.name}</Typography>
          <Typography variant="caption">{moment(article.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          <IconButton onClick={openArticleMenu} size="small">
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="article-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={closeArticleMenu}
          >
            <MenuItem
              key="edit"
              id="edit"
              disabled={user?.result?.googleId !== article?.name || user?.result?._id !== article?.name}
              className={classes.menuItems}
              onClick={(e) => closeArticleMenu(e, article._id)}
            >
              <EditOutlinedIcon fontSize="small" />
              Edit Article
            </MenuItem>
            <MenuItem
              key="delete"
              id="delete"
              disabled={user?.result?.googleId !== article?.name || user?.result?._id !== article?.name}
              className={classes.menuItems}
              onClick={(e) => closeArticleMenu(e, article._id)}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
              Delete Article
            </MenuItem>
          </Menu>
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
            {article.description.substring(0, 256)}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Typography variant="caption" color="textSecondary">
          <VisibilityIcon fontSize="small" />
          &nbsp; 13K Visualizations
        </Typography>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeArticle(article._id))}>
          <Likes />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Article;
