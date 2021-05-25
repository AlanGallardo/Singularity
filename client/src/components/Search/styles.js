import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
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
      width: '60ch',
    },
  },
  searchButton: {
    marginLeft: theme.spacing(2),
  },
}));