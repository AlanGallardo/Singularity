import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import useStyles from './styles';
import './editor.css';
import { createArticle, updateArticle } from '../../actions/articles';

const Form = ({
  titleProp,
  descriptionProp,
  tagsProp,
  currentId,
}) => {
  const [articleData, setArticleData] = useState({
    title: titleProp ?? '',
    description: descriptionProp ?? '',
    tags: tagsProp ?? '',
    bannerImage: '',
  });
  const [text, setText] = useState(descriptionProp ?? '');
  const article = useSelector((state) => currentId ? state.articles.articles.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  useEffect(() => {
    if (article) setArticleData(article);
  }, [article])

  const clear = () => {
    setArticleData({ title: '', tags: '', bannerImage: '' });
    setText('');
  }

  const handleForm = async (e) => {
    if (currentId)
      dispatch(updateArticle(currentId, { ...articleData, name: user?.result?.name, authorImage: user?.result?.imageUrl }));
    else {
      e.preventDefault();
      dispatch(createArticle({ ...articleData, name: user?.result?.name, authorImage: user?.result?.imageUrl }, history));
    }

    clear();
  };

  if (!user?.result?.name) {
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
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleForm}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} an Article</Typography>
        <TextField
          variant="outlined"
          label="Title"
          fullWidth
          value={articleData.title}
          onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Tags"
          fullWidth
          value={articleData.tags}
          onChange={(e) => setArticleData({ ...articleData, tags: e.target.value.split(',') })}
        />
        <div className={classes.editor}>
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onChange={(e, editor) => {
              const data = editor.getData();
              setText(data);
              setArticleData({ ...articleData, description: text })
            }}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setArticleData({ ...articleData, bannerImage: base64 })}
          />
        </div>
        <div className={classes.actions}>
          <Button variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </div>
      </form>
    </Paper>
  )
}

export default Form;
