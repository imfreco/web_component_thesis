import React, { useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { setTitleNavbar } from '../actions/ui.action';
import { StyledTableCell, useStyles } from '../hooks/styles/InscriptionRead';

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('06-07-2020', 'INSCRITO'),
  createData('03-02-2020', 'INSCRITO'),
  createData('06-07-2019', 'ADMITIDO'),
  createData('03-02-2019', 'ADMITIDO'),
  createData('03-02-2018', 'ADMITIDO'),
];

export const InscriptionRead = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitleNavbar('Inscripciones'));
  }, [dispatch]);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
