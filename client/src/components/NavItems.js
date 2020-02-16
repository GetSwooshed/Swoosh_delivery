import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { getLocation } from '../helpers';
import Modal from './Modal';
import axios from 'axios';

const NavItems = () => {
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('user')
    history.push('/')
  }

  const handleCreateDonation = async () => {
    setLoading(true);
    const { lat, lon } = await getLocation();
    const userId = localStorage.getItem('user');
    const item = 'Test Item';
    const data = {
      userId,
      coordinates: [lon, lat],
      item
    }

    try {
      const res = await axios.post('/donations', data);
      if (res.data) {
        console.log("SUCCESS")
        alert("Success creating new donation")
        setLoading(false);
      }
    } catch(err) {
      alert(err)
    }
  }

  return (
    <div>
      <ListItem button onClick={() => history.push('/profile')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem
        button
        onClick={() => history.push('/map')}
      >
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Map" />
      </ListItem>
      <ListItem button onClick={() => setModalOpen(true)}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="New Donation" />
        { loading && <CircularProgress />}
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      <Modal
        open={modalOpen}
        toggleModal={setModalOpen}
      />
    </div>
  );
};

export default NavItems;