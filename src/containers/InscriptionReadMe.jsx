import React, { useEffect } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { StyledTableCell, useStyles } from '../hooks/styles/InscriptionRead';
import { setTitleNavbar } from '../actions/ui.action';
import { startInscriptionsReadMe } from '../actions/inscription.action';
import { AssignmentTurnedInRounded, DeleteRounded } from '@material-ui/icons';

export const InscriptionReadMe = () => {
  const classes = useStyles();

  const { inscriptions } = useSelector((state) => state.inscriptionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitleNavbar('Mis Inscripciones'));
    dispatch(startInscriptionsReadMe());
  }, [dispatch]);

  const handleAccept = () => {
    console.log('Aceptando...');
  };

  const handleDelete = () => {
    console.log('Eliminando...');
  };

  return (
    <main className={classes.layout}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Fecha</StyledTableCell>
              <StyledTableCell>Estado</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inscriptions.map(({ id, createdAt, state }) => (
              <TableRow key={id}>
                <TableCell>{`${new Date(createdAt).getFullYear()}-${
                  new Date(createdAt).getMonth() + 1
                }-${new Date(createdAt).getDate()}`}</TableCell>
                <TableCell>{state ? 'ADMITIDO' : 'INSCRITO'}</TableCell>
                <TableCell>
                  <IconButton aria-label='eliminar' onClick={handleDelete}>
                    <DeleteRounded />
                  </IconButton>
                  {state && (
                    <IconButton aria-label='aceptar' onClick={handleAccept}>
                      <AssignmentTurnedInRounded />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
