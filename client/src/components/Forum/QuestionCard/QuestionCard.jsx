import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Chip,
} from '@material-ui/core';
import moment from 'moment';
import parse from 'html-react-parser';
import styles from './styles';

const QuestionCard = ({ question }) => {
  const classes = styles();
  const history = useHistory();

  const openQuestion = () => history.push(`forum/${question._id}`);

  return (
    <Card className={classes.root} elevation={3}>
      <ButtonBase className={classes.cardAction} onClick={openQuestion}>
        <div className={classes.header}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} src={question.authorImage}>
                A
              </Avatar>
            }
            title={question.title}
            subheader={moment(question.createdAt).fromNow()}
          />
          <Chip
            className={question.solved ? classes.solvedTag : classes.unsolvedTag}
            label={question.solved ? 'Solved' : 'Unsolved'}
          />
        </div>
        <Divider />
        <CardContent>
          <Typography paragraph variant="body2" align="left">
            {parse(question.description)}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default QuestionCard;
