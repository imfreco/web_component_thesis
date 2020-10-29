import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 2,
  },
}));

export const ItemDictionary = ({ original, substitute }) => {
  const classes = useStyles();

  return (
    <Chip
      className={classes.root}
      variant='outlined'
      size='medium'
      avatar={<Avatar>{substitute}</Avatar>}
      label={original}
    />
  );
};

ItemDictionary.propTypes = {
  original: PropTypes.string.isRequired,
  substitute: PropTypes.string.isRequired,
};
