import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { getQuestions } from '../../actions/questions';
import QuestionCard from './QuestionCard/QuestionCard';
import ForumForm from './ForumForm/ForumForm';
import styles from './styles';

const Forum = () => {
  const [openForm, setOpenForm] = useState(false);
  const { questions, isLoading } = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  const classes = styles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const handleModal = () => setOpenForm(!openForm);

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">
          Forum
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleModal}
        >
          New
        </Button>
      </div>
      <Divider />
      <Modal
        open={openForm}
        closeAfterTransition
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, }}
      >
        <Fade in={openForm}>
          <Paper className={classes.form}>
            <CloseIcon className={classes.closeButton} onClick={handleModal} />
            <ForumForm />
          </Paper>
        </Fade>
      </Modal>
      {isLoading ? <CircularProgress style={{ margin: '10px' }} /> : (
        questions.map((q) => (
          <QuestionCard question={q} />
        ))
      )}
    </Paper>  
  );
};

export default Forum;
