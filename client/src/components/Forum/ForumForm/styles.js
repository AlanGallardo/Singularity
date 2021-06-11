import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(5),
  },
  form: {
    [theme.breakpoints.up('md')]: {
      height: '40ch',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
  },
  editor: {
    marginLeft: theme.spacing(1),
  },
}));