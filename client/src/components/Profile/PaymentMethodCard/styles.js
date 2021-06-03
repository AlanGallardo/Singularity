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
  payment: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3),
  },
  frontCard: {
    display: 'flex',
    flexFlow: 'column',
    border: '1px solid',
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(2),
    padding: theme.spacing(4),
  },
  headerCard: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bottomCard: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: theme.spacing(6),
  },
  infoCard: {
    display: 'flex',
    marginRight: theme.spacing(1),
  },
  backCard: {
    border: '1px solid',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
  },
}));