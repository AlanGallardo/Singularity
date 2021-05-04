import { makeStyles } from '@material-ui/core';

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
}));