import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Avatar, IconButton } from '@material-ui/core';
import { getCurrentUser } from '../../redux/userReducer';
import { auth } from '../../firebase/firebaseUtils';

const LogOutMenu = () => {
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    try {
      await handleClose();
      await auth.signOut();
      history.push('/');
    } catch (error) {
      console.log('Logout failed');
    }
  };
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="primary"
      >
        <Avatar alt={currentUser.fullName} src={currentUser.photo} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="/user/profile">
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/user">
          Dashboard
        </MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default LogOutMenu;
