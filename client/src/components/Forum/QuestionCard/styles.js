import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  solvedTag: {
    backgroundColor: '#5CB85C',
    color: 'white',
  },
  unsolvedTag: {
    backgroundColor: '#D9534F',
    color: 'white',
  },
}));