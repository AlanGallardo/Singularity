import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  ButtonBase,
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Fade,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  Paper,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import parse from 'html-react-parser';

import Form from '../../Form/Form';
import { deleteArticle, likeArticle } from '../../../actions/articles';
import Styles from './styles';

const Article = ({ article, setCurrentId }) => {
  const [openForm, setOpenForm] = useState(false);
  //const [currentId, setCurrentId] = useState(null);
  const classes = Styles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (article.likes?.length > 0) {
      return article.likes?.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{article.likes.length > 2 ? `You and ${article.likes.length - 1} others` : `${article.likes.length} like${article.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{article.likes.length} {article.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const handleForm = () => {
    setCurrentId(article._id);
    setOpenForm(!openForm);
  };

  const openPost = () => history.push(`/articles/${article._id}`);

  const tooltipLikeTitle = () => {
    if (user?.result?.googleId === article?.author || user?.result?._id === article?.author)
      return 'You cannot like your own articles';
    else if (user?.result?.googleId || user?.result?._id)
      return 'Like Article';
    else
      return 'Sign In to like articles';
  };

  const handleDelete = () => {
    dispatch(deleteArticle(article._id));
    history.push('/');
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={article.bannerImage} title={article.title} />
        <div className={classes.overlay}>
          <Typography variant="h6" className={classes.author}>{article.name}</Typography>
          <Typography variant="caption">{moment(article.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.infoCard}>
          <Avatar alt={article.author} src={article?.authorImage} className={classes.avatar}>
            <Typography variant="h4">{article.name?.charAt(0)}</Typography>
          </Avatar>
          <div className={classes.tagsContainer}>
            {article.tags.map((tag) => (
              <Chip className={classes.tag} color="default" size="small" label={tag} />
            ))}
          </div>
        </div>
        <Typography className={classes.title} variant="body1">{article.title}</Typography>
        <CardContent>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
          >
            {parse(article.description.substring(0, article.description.indexOf('.') + 1))}...
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
                onClick={handleForm}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Article" placement="top">
              <IconButton
                color="primary"
                disabled={!user?.result}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </CardActions>
      <Modal
        open={openForm}
        closeAfterTransition
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, }}
      >
        <Fade in={openForm}>
          <Paper className={classes.paper}>
            <CloseIcon className={classes.closeButton} onClick={handleForm} />
            <Form
              currentId={article._id}
              titleProp={article.title}
              descriptionProp={article.description}
              tagsProp={article.tags}
            />
          </Paper>
        </Fade>
      </Modal>
    </Card>
  );
}

export default Article;
