import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    padding: '20px', 
    borderRadius: '15px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  tag: {
    margin: theme.spacing(1, 0, 0, 2),
  },
  solvedTag: {
    backgroundColor: '#5CB85C',
    color: 'white',
  },
  unsolvedTag: {
    backgroundColor: '#D9534F',
    color: 'white',
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  rightSection: {
    display: 'flex',
    flexFlow: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: theme.spacing(0, 2, 2, 0),
    border: '2px solid gray',
  },
  smallAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  moment: {
    marginTop: theme.spacing(1),
  },
  answers: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  answer: {
    display: 'flex',
    alignItems: 'center',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  answerCreatedAt: {
    borderLeft: '1px solid',
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    color: 'gray',
  },
}));