import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  itemNav: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export const ItemNavigation = ({ tag, path, IconComponent }) => {
  const classes = useStyles();

  return (
    <Link to={path} className={classes.itemNav}>
      <ListItem button>
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
        <ListItemText primary={tag} />
      </ListItem>
    </Link>
  );
};

ItemNavigation.propTypes = {
  tag: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  IconComponent: PropTypes.object.isRequired,
};
