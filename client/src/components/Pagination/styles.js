import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  ul: {
    justifyContent: 'space-around',
  },
  paginationItem: {
    fontSize: '18px',
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'cyan',
    }
  }
}));