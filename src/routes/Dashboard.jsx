import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
} from '@material-ui/core';
import { MenuRounded, ChevronLeft } from '@material-ui/icons';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ListItemNavigation } from '../components/ListItemNavigation';
import { InscriptionCreate } from '../containers/InscriptionCreate';
import { HomeDash } from '../containers/HomeDash';
import { InscriptionRead } from '../containers/InscriptionRead';
import { InscriptionReadMe } from '../containers/InscriptionReadMe';
import { PlanningComponents } from '../containers/PlanningComponents';
import PlanningMenus from '../containers/PlanningMenus';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#3c3c3c',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export function Dashboard() {
  const classes = useStyles();

  const { titleNavbar } = useSelector((state) => state.uiReducer);

  const { path } = useRouteMatch();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuRounded />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            {titleNavbar}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemNavigation />
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Switch>
            <Route exact path={`${path}/home`} component={HomeDash} />

            <Route
              exact
              path={`${path}/inscription/create`}
              component={InscriptionCreate}
            />

            <Route
              exact
              path={`${path}/inscription/readme`}
              component={InscriptionReadMe}
            />

            <Route
              exact
              path={`${path}/inscription/read`}
              component={InscriptionRead}
            />

            <Route
              exact
              path={`${path}/planning/component`}
              component={PlanningComponents}
            />

            <Route
              exact
              path={`${path}/planning/menu`}
              component={PlanningMenus}
            />

            <Redirect to={`${path}/home`} />
          </Switch>
        </Container>
      </main>
    </div>
  );
}
