import { makeStyles, TableCell, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
  table: {
    minWidth: 650,
  },
  centerContent: {
    textAlign: 'center',
  },
}));

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3c3c3c',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))(TableCell);
