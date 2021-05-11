import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { deleteArticle, likeArticle } from '../../../actions/articles';
import Styles from './styles';

const Article = ({ article, setCurrentId }) => {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const open = Boolean(anchorEl);

  const classes = Styles();
  const dispatch = useDispatch();

  const openArticleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeArticleMenu = (e, id) => {
    if(e.currentTarget.id === 'edit')
      setCurrentId(id);
    if(e.currentTarget.id === 'delete')
      dispatch(deleteArticle(id));

    setAnchorEl(null);
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={article.bannerImage} title={article.title} />
      <div className={classes.overlay}>
        <Typography variant="h6" className={classes.author}>{article.author}</Typography>
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
          <MenuItem key="edit" id="edit" className={classes.menuItems} onClick={(e) => closeArticleMenu(e, article._id)}>
            <EditOutlinedIcon fontSize="small" />
            Edit Post
          </MenuItem>
          <MenuItem key="delete" id="delete" className={classes.menuItems} onClick={(e) => closeArticleMenu(e, article._id)}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
            Delete Post
          </MenuItem>
        </Menu>
      </div>
      <div className={classes.infoCard}>
        <Avatar alt={article.author} src="" className={classes.avatar} />
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
          {article.description.substring(0, 256)}<Link> ... keep reading</Link>
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Typography variant="caption" color="textSecondary">
          <VisibilityIcon fontSize="small" />
          &nbsp; 13K Visualizations
        </Typography>
        <Button size="small" color="primary" onClick={() => dispatch(likeArticle(article._id))}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {article.likes}
        </Button>
      </CardActions>
    </Card>
  );
}

export default Article;
