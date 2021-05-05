import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { deleteArticle, likeArticle } from '../../../actions/articles';
import Styles from './styles';

const Article = ({ article, setCurrentId }) => {
  const classes = Styles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={article.bannerImage} title={article.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{article.author}</Typography>
        <Typography variant="body2">{moment(article.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(article._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        {article.tags.map((tag) => (
          <Chip style={{ marginRight: '5px' }} color="default" size="small" label={tag} />
        ))}
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{article.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{article.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likeArticle(article._id))}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {article.likes}
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteArticle(article._id))}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Article;
