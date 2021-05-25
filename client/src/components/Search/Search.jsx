import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChipInput from 'material-ui-chip-input';

import { getArticlesByKeyword, getArticlesByTag } from '../../actions/articles';
import styles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const [searchByTag, setSearchByTag] = useState(false);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const classes = styles();
  
  const searchKeyword = () => {
    if (search.trim()) {
      dispatch(getArticlesByKeyword(search));
      history.push(`/articles/search?keyword=${search}`);
    } else {
      history.push('/');
    }
  };

  const searchTag = () => {
    if (tags) {
      dispatch(getArticlesByTag({ tags: tags.join(',') }));
      history.push(`/articles/search?tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
  const switchMode = () => setSearchByTag(!searchByTag);

  return (
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
          <Button onClick={searchTag} className={classes.searchButton} variant="contained" color="primary">Search</Button>
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
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={switchMode}>Tag</Button>
          <Button onClick={searchKeyword} className={classes.searchButton} variant="contained" color="primary">Search</Button>
        </>
      )}
    </div>
  );
};

export default Search;