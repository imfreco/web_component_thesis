import React from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#3c3c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#4b4b4b',
    },
  },
}));

export const InscriptionCreate = () => {
  const classes = useStyles();

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Puntaje sisben
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                // value={}
                // onChange={}
              >
                <MenuItem>0 - 15</MenuItem>
                <MenuItem>15.01 - 20</MenuItem>
                <MenuItem>20.01 - 30</MenuItem>
                <MenuItem>+30</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Promedio ponderado
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                // value={}
                // onChange={}
              >
                <MenuItem>3.8 - 4.2</MenuItem>
                <MenuItem>4.3 - 4.7</MenuItem>
                <MenuItem>3 - 3.7</MenuItem>
                <MenuItem>4.8 - 5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Población vulnerable
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                // value={}
                // onChange={}
              >
                <MenuItem>Si</MenuItem>
                <MenuItem>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Distancia
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                // value={}
                // onChange={}
              >
                <MenuItem>0 - 1 km</MenuItem>
                <MenuItem>1 - 2 km</MenuItem>
                <MenuItem>+2 km</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <Button
                type='submit'
                variant='contained'
                className={classes.button}
                startIcon={<CheckCircleRounded />}
              >
                Inscribirse
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};
