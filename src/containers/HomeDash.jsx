import React from 'react';
import { RestaurantMenuRounded } from '@material-ui/icons';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  iconHomeDashboard: {
    fontSize: 250,
  },
}));

export const HomeDash = () => {
  const classes = useStyles();

  return (
    <>
      <Typography align='center'>
        <RestaurantMenuRounded className={classes.iconHomeDashboard} />
      </Typography>
      <Typography variant='h3' component='h2' align='center'>
        Bienvenido al servicio de alimentación
      </Typography>
    </>
  );
};
