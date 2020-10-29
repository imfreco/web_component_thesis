import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from '../hooks/styles/Login';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  BackspaceRounded,
  CheckCircleRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@material-ui/icons';

import { startDictionaryRead } from '../actions/authentication.action';
import { ItemDictionary } from '../components/ItemDictionary';
import { useForm } from '../hooks/useForm';

export const LogIn = () => {
  const classes = useStyles();

  const {
    dictionary: { alphabet, numbers },
  } = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startDictionaryRead());
  }, [dispatch]);

  const buttonNumbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const [values, setValues] = useState({
    showPassword: false,
    showNumberKeyboard: false,
  });

  const handleLogin = () => {
    console.log(formValues);
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6}
        md={7}
        component={Paper}
        className={classes.backDark}
        square
      >
        <div className={classes.paper}>
          <Box component='div' mb={4}>
            {alphabet.map(({ original, substitute }) => (
              <ItemDictionary
                original={original}
                substitute={substitute}
                key={original}
              />
            ))}
          </Box>
          <Box component='div'>
            {numbers.map(({ original, substitute }) => (
              <ItemDictionary
                original={original}
                substitute={substitute}
                key={original}
              />
            ))}
          </Box>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Inicio de Sesión
          </Typography>
          <form className={classes.form}>
            <TextField
              autoComplete='email'
              autoFocus
              variant='outlined'
              margin='normal'
              fullWidth
              label='Correo'
              name='email'
              value={email}
              onChange={handleInputChange}
              onFocus={() => {
                setValues((state) => ({
                  ...state,
                  showNumberKeyboard: false,
                }));
              }}
            />
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='outlined-adornment-password'>
                Contraseña
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setValues((state) => ({
                          ...state,
                          showPassword: !values.showPassword,
                        }))
                      }
                      edge='end'
                    >
                      {values.showPassword ? (
                        <VisibilityRounded />
                      ) : (
                        <VisibilityOffRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={85}
                onFocus={() => {
                  setValues((state) => ({
                    ...state,
                    showNumberKeyboard: true,
                  }));
                }}
              />
            </FormControl>
            {values.showNumberKeyboard && (
              <Grid container justify='center'>
                {buttonNumbers.map((number) => (
                  <Grid
                    item
                    xs={4}
                    key={number}
                    className={classes.containerButtonNumber}
                  >
                    <Button
                      variant='contained'
                      className={classes.buttonNumber}
                      onClick={() => {
                        const value = `${password}${number}`;
                        handleInputChange({
                          target: { name: 'password', value },
                        });
                      }}
                    >
                      {number}
                    </Button>
                  </Grid>
                ))}
                <Button
                  variant='contained'
                  startIcon={<BackspaceRounded />}
                  className={classes.button}
                  onClick={() => {
                    const value = `${password.slice(0, password.length - 1)}`;
                    handleInputChange({
                      target: { name: 'password', value },
                    });
                  }}
                >
                  Borrar
                </Button>
              </Grid>
            )}
            <Button
              variant='contained'
              startIcon={<CheckCircleRounded />}
              className={classes.button}
              fullWidth
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
