import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import ChipInput from 'material-ui-chip-input';
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import { getArticlesBySearch } from '../../actions/articles';
import ListItems from './ListItems/ListItems';
import Styles from './styles';
import logo from '../../resources/images/logo.png';
import loginImage from '../../resources/images/login.svg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NavBar = () => {
  const classes = Styles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [searchByTag, setSearchByTag] = useState(false);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const searchArticle = () => {
    if (search.trim() || tags) {
      dispatch(getArticlesBySearch({ search, tags: tags.join(',') }));
      history.push(`/articles/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchArticle();
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
  const switchMode = () => setSearchByTag(!searchByTag);

  const openLoginMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeLoginMenu = () => {
    setAnchorEl(null);
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={toggleDrawer} classes={{ paper: classes.drawer }}>
          <ListItems />
        </Drawer>
        <Avatar component={Link} to="/" variant="square" src={logo} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          {searchByTag ? (
            <>
              <ChipInput
                placeholder="Search Articles By Tag"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
              <Button onClick={switchMode}>Keyword</Button>
            </>
          ) : (
            <>
              <InputBase
                placeholder="Search Articles By Keyword"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={switchMode}>Tag</Button>
            </>
          )}
        </div>
        <Button onClick={searchArticle} className={classes.searchButton} variant="contained" color="primary">Search</Button>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Button className={classes.options}>About Me</Button>
          <Button className={classes.options}>Contact</Button>

          <IconButton edge="end" color="inherit" onClick={openLoginMenu}>
            {user ? (
              <Avatar className="O" alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            ) : (
              <img src={loginImage} alt="img" height="30" />
            )}
          </IconButton>

          <Menu
            id="article-menu"
            open={openMenu}
            anchorEl={anchorEl}
            onClose={closeLoginMenu}
          >

            {user ? (
              <MenuItem key="logout" id="login" onClick={logout}>
                <ExitToAppOutlinedIcon fontSize="small" />
                Logout
              </MenuItem>
            ) : (
              <MenuItem key="login" id="login" component={Link} to="/auth" onClick={closeLoginMenu}>
                <ExitToAppOutlinedIcon fontSize="small" />
                Login
              </MenuItem>
            )}

          </Menu>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;