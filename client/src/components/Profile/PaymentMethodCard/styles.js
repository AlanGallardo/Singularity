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
  },
  bottomCard: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: theme.spacing(6),
  },
  infoCard: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  backCard: {
    border: '1px solid',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
  },
  emptyBackgroundCard: {
    background: 'linear-gradient(220deg, #8693ab 0%, #bdd4e7 100%)',
  },
  filledBackgroundCard: {
    background: 'linear-gradient(220deg, rgba(91, 160, 255, 1) 0%, rgba(137, 247, 254, 1) 100%)',
  },
  deleteCard: {
    position: 'relative',
    left: '375px',
    top: '-25px',
    margin: '-10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
  },
}));