import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backDark: {
    backgroundColor: '#3d3d3d',
  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  containerNumericKeyboard: {
    margin: theme.spacing(4, 0),
  },
  containerButtonNumber: {
    textAlign: 'center',
  },
  buttonNumber: {
    margin: 5,
    backgroundColor: '#3c3c3c',
    borderRadius: 20,
    color: 'white',
    '&:hover': {
      backgroundColor: '#4b4b4b',
    },
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3c3c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#4b4b4b',
    },
  },
}));
