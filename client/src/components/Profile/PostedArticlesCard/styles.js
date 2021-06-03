import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toggleCard: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
  },
  card: {
    margin: theme.spacing(3),
  },
  posted: {
    margin: theme.spacing(3),
  },
}));