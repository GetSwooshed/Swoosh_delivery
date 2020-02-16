import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

const NavItems = () => {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('user')
    history.push('/')
  }

  return (
    <div>
      <ListItem button onClick={() => history.push('/profile')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem button onClick={() => history.push('/map')}>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Map" />
      </ListItem>
      <ListItem button >
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="New Donation" />
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
};

export default NavItems;