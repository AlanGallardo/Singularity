import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import styles from './styles';

const Search = () => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const classes = styles();

  const searchArticle = () => {
    if (search.trim()) {
      history.push(`/articles/search?searchQuery=${search}`);
    } else {
      history.push('/');
    }
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search Articles..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button onClick={searchArticle} className={classes.searchButton} variant="contained" color="primary">Search</Button>
    </>
  );
};

export default Search;