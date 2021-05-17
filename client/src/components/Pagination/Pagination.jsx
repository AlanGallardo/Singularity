import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import Styles from './styles';

const Paginate = () => {
  const classes = Styles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outline"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/articles?page=${1}`} />
      )}
    />
  );
};

export default Paginate;