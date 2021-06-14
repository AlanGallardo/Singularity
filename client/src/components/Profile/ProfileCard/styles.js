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
  profile: {
    display: 'flex',
    margin: theme.spacing(3),
  },
  editButton: {
    position: 'relative',
    left: '300px',
    top: '-25px',
    margin: '-10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
  },
  avatarContainer: {
    display: 'flex',
    flexFlow: 'column',
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(0, 5, 2, 0),
  },
  textFields: {
    display: 'flex',
    flexFlow: 'column',
    flexGrow: '1',
    marginRight: theme.spacing(20),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  subscribe: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogText: {
    margin: theme.spacing(2),
  },
  dialogButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));