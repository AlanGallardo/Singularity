import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
  },
  form: {
    [theme.breakpoints.up('md')]: {
      height: '70ch',
    },
  },
  fileInput: {
    width: '97%',
    marginLeft: '10px',
    padding: '10px',
  },
  actions: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  editor: {
    marginLeft: theme.spacing(1),
  },
}));