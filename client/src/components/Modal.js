import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getLocation } from '../helpers';
import axios from 'axios';

export default function Modal({ open, toggleModal, updateItems }) {
  const apiKey = '4PsfUOgZG1PxD5bSDjCeQjAdR4QTk6Fp'
  const initState = {
    item: '',
    lat: null,
    lon: null,
    userId: '',
  }

  const [state, setState] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTING")
    if (!state.item) {
      alert('Please include a description to submit a donation');
      return;
    }

    const { lat, lon, item, userId } = state;
    const data = {
      coords: [lon, lat],
      item,
      userId,
    }
    const url = `https://api.tomtom.com/search/2/reverseGeocode/${lat}%2C${lon}.json?key=${apiKey.toString()}`;
    const addressRes = await axios.get(url);
    if (addressRes.data && addressRes.data.addresses) {
      data.address = addressRes.data.addresses[0].address.freeformAddress;
    }

    try {
      const res = await axios.post('/donations', data);
      if (res.data) {
        alert("Success creating new donation")
        const { createdDonation } = res.data;
        data._id = createdDonation;
        if (updateItems) {
          updateItems(data);
        } else {
    window.location.reload();
    }
        toggleModal(false);
      }
    } catch(err) {
      alert(err)
    }
  }

  const handleSetup = async () => {
    const { lat, lon } = await getLocation();
    const userId = localStorage.getItem('user');
    setState({
      ...state,
      userId,
      lat,
      lon
    })
  }

  useEffect(() => {
    handleSetup()
  }, [])

  return (
    <div>
      <Dialog open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Donation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Latitude: {state.lat}
            Longitude: {state.lon}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="item"
            label="Item Name"
            type="text"
            value={state.item}
            onChange={handleChange}
            name="item"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit Donation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}