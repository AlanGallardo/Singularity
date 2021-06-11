import React, { useState } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import './editor.css';
import { createQuestion } from '../../../actions/questions';

const ForumForm = () => {
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setQuestionData({ title: '', description: '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({...questionData});
    dispatch(createQuestion({
      ...questionData,
      name: user?.result?._id || user?.result?.googleId,
      authorImage: user?.result?.imageUrl
    }, history));

    clear();
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">New Question</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={questionData.title}
          onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={questionData.description}
          onChange={(e) => setQuestionData({ ...questionData, description: e.target.value })}
        />
        <div className={classes.actions}>
          <Button variant="contained" color="secondary" size="medium" onClick={clear} style={{ marginRight: '10px' }}>Clear</Button>
          <Button variant="contained" color="primary" size="medium" type="submit">Submit</Button>
        </div>
      </form>
    </Paper>
  )
}

export default ForumForm;
