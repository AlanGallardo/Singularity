import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Article from '../../Articles/Article/Article';
import styles from './styles';

const PostedArticlesCard = () => {
  const [open, setOpen] = useState(true);
  const { articles, isLoading } = useSelector((state) => state.articles);
  const classes = styles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const authorArticles = articles.filter((article) => user?.result?.name === article.name);

  const toggleCard = () => setOpen(!open);

  return (
    <>
      <div className={classes.toggleCard}>
        <Typography variant="h4">Posted Articles</Typography>
        {open ? <ExpandLess onClick={toggleCard} /> : <ExpandMore onClick={toggleCard} />}
      </div>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card className={classes.card}>
          <CardContent className={classes.posted}>
            <Grid container alignItems="stretch" spacing={3}>
              {isLoading ? <CircularProgress /> : (
                authorArticles.map((a) => (
                  <Grid key={a._id} item xs={12} sm={12} md={3}>
                    <Article article={a} />
                  </Grid>
                )
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
};

export default PostedArticlesCard;
