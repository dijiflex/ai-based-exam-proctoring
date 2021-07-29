import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { Box, Container, Hidden, SwipeableDrawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import SettingsIcon from '@material-ui/icons/Settings';
import LogOutMenu from '../../Components/LogoutMenu/LogOutMenu';
import UseDashboard from './UseDashboard';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  toolRoot: {
    justifyContent: 'space-between'
  }
}));

export default function UserPage() {
  const [userDrawer, setUserDrawer] = useState(false);
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  const handleDrawer = () => {
    setUserDrawer(!userDrawer);
  };

  const drawer = (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem component={Link} onClick={handleDrawer} to={`${url}`} button>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} onClick={handleDrawer} to={`${url}/userGroups`} button>
          <ListItemIcon>
            <MoneyOffIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="User Groups" />
        </ListItem>

        <ListItem component={Link} onClick={handleDrawer} to={`${url}/allUsers`} button>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem component={Link} onClick={handleDrawer} to={`${url}/profile`} button>
          <ListItemIcon>
            <SettingsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolRoot}>
          <Box>
            <Hidden smUp>
              <IconButton
                edge="start"
                onClick={handleDrawer}
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
          <Box>
            <Typography variant="h5" noWrap>
              AI Based Exam Proctoring
            </Typography>
          </Box>
          <Box>
            <LogOutMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <SwipeableDrawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper
          }}
          open={userDrawer}
          onClose={handleDrawer}
          onOpen={handleDrawer}
        >
          <Toolbar />
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Hidden>
      <Container maxWidth="lg" className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <UseDashboard />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}
