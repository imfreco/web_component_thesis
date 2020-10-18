import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { useStyles } from '../hooks/styles/InscriptionCreate';
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import MomentUtils from '@date-io/moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { useForm } from '../hooks/useForm';
import { setTitleNavbar } from '../actions/ui.action';
import {
  menuDetailAdded,
  menuDetailDeleted,
  startComponentsRead,
  startMenuCreate,
} from '../actions/planning.action';
import Swal from 'sweetalert2';
import { isOnMenuDetails } from '../helpers/validations.helper';

const PlanningMenus = () => {
  const classes = useStyles();

  const { components, menuDetails } = useSelector(
    (state) => state.planningReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitleNavbar('Registrar Menú'));
    dispatch(startComponentsRead());
  }, [dispatch]);

  const [formValues, handleChange, reset] = useForm({
    componentId: 0,
    value: '',
    date: moment(),
  });

  const { componentId, value, date } = formValues;

  const handleAddComponent = () => {
    if (componentId === 0 && value.length < 3) {
      Swal.fire(
        'Tenga en cuenta',
        'Debe seleccionar el componente y su alimento debe tener mínimo 3 caracteres',
        'warning'
      );
    } else if (isOnMenuDetails(menuDetails, componentId)) {
      Swal.fire(
        'Tenga en cuenta',
        'Este componente ya ha sido añadido',
        'warning'
      );
    } else {
      dispatch(
        menuDetailAdded({
          componentId,
          value,
        })
      );
      reset();
    }
  };

  const handleDeleteChip = (componentId) => {
    dispatch(menuDetailDeleted(componentId));
  };

  const handleRegisterMenu = async () => {
    const { value } = await Swal.fire({
      title: 'Responder',
      text: '¿Acepta registrar el menú?',
      showCancelButton: true,
      showConfirmButton: true,
    });
    if (value) {
      if (menuDetails.length === components.length)
        dispatch(
          startMenuCreate(
            {
              date: moment(date._d).format('yyyy-MM-DD'),
              menuDetails,
            },
            reset
          )
        );
      else
        Swal.fire(
          'Tenga en cuenta',
          'Faltan componentes por agregar',
          'warning'
        );
    }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} component='form'>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Componentes
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                name='componentId'
                value={componentId}
                onChange={handleChange}
              >
                <MenuItem key={0} value={0}>
                  Seleccionar...
                </MenuItem>
                {components.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant='filled' className={classes.formControl}>
              <TextField
                id='filled-basic'
                label='Nombre del alimento'
                variant='filled'
                name='value'
                value={value}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl variant='filled' className={classes.formControl}>
              <Button
                variant='contained'
                className={classes.button}
                startIcon={<CheckCircleRounded />}
                onClick={handleAddComponent}
              >
                Agregar componente
              </Button>
            </FormControl>
            {menuDetails.map(({ componentId, value }) => (
              <Chip
                key={componentId}
                label={value}
                onDelete={() => handleDeleteChip(componentId)}
                className={classes.chip}
              />
            ))}
          </Grid>
          <Grid item md={6}>
            <FormControl variant='filled' className={classes.formControl}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  id='date-picker-dialog'
                  label='Fecha de aplicación del menú'
                  format='yyyy/MM/DD'
                  value={date}
                  onChange={(date) => {
                    handleChange({ target: { name: 'date', value: date } });
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl variant='filled' className={classes.formControl}>
              <Button
                variant='contained'
                className={classes.button}
                startIcon={<CheckCircleRounded />}
                onClick={handleRegisterMenu}
              >
                Registrar
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export default PlanningMenus;
