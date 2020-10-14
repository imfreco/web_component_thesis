import React, { useEffect } from 'react';
import { RestaurantMenuRounded } from '@material-ui/icons';
import { makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setTitleNavbar } from '../actions/ui.action';

const useStyles = makeStyles((theme) => ({
  iconHomeDashboard: {
    fontSize: 250,
  },
}));

export const HomeDash = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitleNavbar('Principal'));
  }, [dispatch]);

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
