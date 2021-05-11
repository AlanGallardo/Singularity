import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '45.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    width: theme.spacing(45),
    position: 'relative',
  },
  author: {
    fontWeight: 'bold',
  },  
  infoCard: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItems: {
    '& svg': {
      marginRight: '10px',
    }
  },
  avatar: {
    position: 'relative',
    bottom: '50px',
    left: '30px',
    marginBottom: '-30px',
    width: theme.spacing(12),
    height: theme.spacing(12),
    border: '1px solid gray',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
    '& svg': {
      color: 'white',
    }
  },
  grid: {
    display: 'flex',
  },
  tagsContainer: {
    margin: '10px',
  },
  tag: {
    marginRight: '10px',
    height: theme.spacing(2.5),
    border: '1px solid gray',
  },
  title: {
    padding: '0 16px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center'
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));