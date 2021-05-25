import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    width: 250,
    color: 'white',
  },
  subheader: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeDrawer: {
    width: 'auto',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'inherit'
    },
  },
  child: {
    paddingLeft: theme.spacing(11),
    '& span': {
      fontSize: '14px'
    },
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    transition: '.5s',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    }
  }
}));