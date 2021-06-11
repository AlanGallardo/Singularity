import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Avatar,
  Chip,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  TextField,
  Tooltip,
  Button,
  IconButton,
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckIcon from '@material-ui/icons/Check';
import moment from 'moment';
import parse from 'html-react-parser';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getQuestion, answerQuestion, deleteQuestion, updateQuestion } from '../../../actions/questions';
import Styles from './styles';

const QuestionDetails = () => {
  const { id } = useParams();
  const question = useSelector((state) => id ? state.questions.questions.find((q) => q._id === id) : null);
  const [questionData, setQuestionData] = useState({
    title: question.title ?? '',
    description: question.description ?? '',
  });
  const [editing, setEditing] = useState(false);
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = Styles();
  const user = JSON.parse(localStorage.getItem('profile'));

  console.log(question);

  useEffect(() => {
    dispatch(getQuestion(id));
  }, [id, dispatch]);

  if (!question) return null;

  const handleUpdate = () => {
    dispatch(updateQuestion(id,
      {
        ...questionData,
        name: user?.result?._id || user?.result?.googleId,
        authorImage: user?.result?.imageUrl,
        solved: false,
      }))
    setEditing(false);
  }

  const handleDelete = () => {
    dispatch(deleteQuestion(question._id));
    handleReturn();
  };

  const handleReturn = () => history.push('/forum');
  const handleEditing = () => setEditing(true);

  return (
    <Paper className={classes.container} elevation={6}>
      <div className={classes.actions}>
        <IconButton onClick={handleReturn}>
          <KeyboardBackspaceIcon />
        </IconButton>
        {(user?.result?.googleId === question?.name || user?.result?._id === question?.name) && (
          <div>
            <Tooltip title="Delete Question" placement="bottom">
              <IconButton
                color="primary"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {editing ? (
              <Tooltip title="Save Changes" placement="bottom">
                <IconButton
                  color="primary"
                  onClick={handleUpdate}
                >
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Update Question" placement="bottom">
                <IconButton
                  color="primary"
                  onClick={handleEditing}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        )}
      </div>
      <div className={classes.card}>
        <div className={classes.section}>
          <div className={classes.header}>
            <Avatar alt={question.name} src={question.authorImage} className={classes.avatar}>
              <Typography variant="h4">{question?.name?.charAt(0)}</Typography>
            </Avatar>
            {editing ? (
              <TextField
                name="title"
                variant="outlined"
                fullWidth
                value={questionData.title}
                onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
              />
            ) : (
              <Typography variant="h2" component="h2">{questionData.title}</Typography>
            )}
            <Chip
              className={`${classes.tag} ${question.solved ? classes.solvedTag : classes.unsolvedTag}`}
              label={question.solved ? 'Solved' : 'Unsolved'}
            />
          </div>
          <Typography variant="caption" className={classes.moment}>{moment(question.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          {editing ? (
            <TextField
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={questionData.description}
              onChange={(e) => setQuestionData({ ...questionData, description: e.target.value })}
            />
          ) : (
            <Typography gutterBottom variant="body1" component="p" style={{ marginLeft: '12px' }}>{parse(question.description)}</Typography>
          )}
          {question?.answers?.map((answer) => (
            <div className={classes.answers}>
              <IconButton>
                <CheckIcon />
              </IconButton>
              <Avatar className={classes.smallAvatar}>
                <Typography variant="h5">U</Typography>
              </Avatar>
              <Typography variant="body1">
                {answer}
              </Typography>
            </div>
          ))}
          <Divider style={{ margin: '20px 0' }} />
          <div className={classes.answer}>
            <Avatar className={classes.smallAvatar} src={user?.result?.imageUrl}>
              <Typography variant="h5">U</Typography>
            </Avatar>
            <TextField
              name="title"
              variant="outlined"
              label="Answer"
              placeholder="Type your answer..."
              fullWidth
              multiline
              rows={2}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginLeft: '15px' }}
              disabled={answer === ''}
              onClick={() => dispatch(answerQuestion(id, { answer }))}
            >
              Answer
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default QuestionDetails;
