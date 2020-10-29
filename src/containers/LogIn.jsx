import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from '../hooks/styles/Login';
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import { startDictionaryRead } from '../actions/authentication.action';
import { ItemDictionary } from '../components/ItemDictionary';

export const LogIn = () => {
  const classes = useStyles();

  const {
    dictionary: { alphabet, numbers },
  } = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startDictionaryRead());
  }, [dispatch]);

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={7} component={Paper} square>
        <Box component='div' m={2}>
          {alphabet.map(({ original, substitute }) => (
            <ItemDictionary
              original={original}
              substitute={substitute}
              key={original}
            />
          ))}
        </Box>
        <Box component='div' m={2}>
          {numbers.map(({ original, substitute }) => (
            <ItemDictionary
              original={original}
              substitute={substitute}
              key={original}
            />
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Inicio de Sesión
          </Typography>
          <form className={classes.form}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='default'
              className={classes.submit}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
