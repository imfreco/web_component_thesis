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
import {
  startInscriptionAdmit,
  startInscriptionsRead,
} from '../actions/inscription.action';
import { AssignmentTurnedInRounded } from '@material-ui/icons';
import Swal from 'sweetalert2';

export const InscriptionRead = () => {
  const classes = useStyles();

  const { inscriptions } = useSelector((state) => state.inscriptionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitleNavbar('Inscripciones'));
    dispatch(startInscriptionsRead());
  }, [dispatch]);

  const handleAdmit = async (inscriptionId) => {
    const { value } = await Swal.fire({
      title: 'Responder',
      text: '¿Está de acuerdo en admitir esta inscripción?',
      showCancelButton: true,
      showConfirmButton: true,
    });
    if (value) dispatch(startInscriptionAdmit(inscriptionId));
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
                <TableCell className={classes.centerContent}>
                  {`${new Date(createdAt).getFullYear()}-${
                    new Date(createdAt).getMonth() + 1
                  }-${new Date(createdAt).getDate()}`}
                </TableCell>
                <TableCell className={classes.centerContent}>
                  {state ? 'ADMITIDO' : 'INSCRITO'}
                </TableCell>
                <TableCell className={classes.centerContent}>
                  {!state && (
                    <IconButton
                      aria-label='admitir'
                      onClick={() => handleAdmit(id)}
                    >
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
