import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    padding: '20px', 
    borderRadius: '15px',
  },
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  tagsContainer: {
    margin: '10px',
  },
  tag: {
    marginRight: '10px',
    height: theme.spacing(2.5),
    border: '1px solid gray',
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    border: '2px solid gray',
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedArticles: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
}));