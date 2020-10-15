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
import { startInscriptionsRead } from '../actions/inscription.action';
import { AssignmentTurnedInRounded } from '@material-ui/icons';

export const InscriptionRead = () => {
  const classes = useStyles();

  const { inscriptions } = useSelector((state) => state.inscriptionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitleNavbar('Inscripciones'));
    dispatch(startInscriptionsRead());
  }, [dispatch]);

  const handleClick = () => {
    console.log('Admitiendo...');
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
                  <IconButton aria-label='admitir' onClick={handleClick}>
                    <AssignmentTurnedInRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
