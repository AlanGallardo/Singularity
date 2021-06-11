import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drawer: {
    backgroundColor: '#55BCC9',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(20),
      height: theme.spacing(6),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1.8, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70ch',
    },
  },
  searchButton: {
    marginLeft: theme.spacing(2),
  },
  options: {
    color: '#c5c5c5',
    margin: theme.spacing(1, 5, 0, 0),
    backgroundColor: 'inherit',
  },
  sectionDesktop: {
    color: 'white',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    color: 'white',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
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
  },
}));