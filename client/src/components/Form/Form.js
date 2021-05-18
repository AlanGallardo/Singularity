import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createArticle, updateArticle } from '../../actions/articles';

const Form = ({ currentId, setCurrentId }) => {
  const [ articleData, setArticleData ] = useState({
    title: '',
    description: '',
    tags: '',
    bannerImage: '',
  });
  const article = useSelector((state) => currentId ? state.articles.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (article) setArticleData(article);
  }, [article])

  const clear = () => {
    setCurrentId(null);
    setArticleData({ title: '', description: '', tags: '', bannerImage: '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId)
      dispatch(updateArticle(currentId, { ...articleData, name: user?.result?.name, authorImage: user?.result?.imageUrl }));
    else
      dispatch(createArticle({ ...articleData, name: user?.result?.name, authorImage: user?.result?.imageUrl }));

    clear();
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own articles and like other's articles.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} an Article</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={articleData.title}
          onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          value={articleData.description}
          onChange={(e) => setArticleData({ ...articleData, description: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={articleData.tags}
          onChange={(e) => setArticleData({ ...articleData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setArticleData({ ...articleData, bannerImage: base64 })}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;
