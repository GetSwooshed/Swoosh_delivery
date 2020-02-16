import React, { useEffect, useState } from 'react';
// import styles from './Map.css';
import Dashboard from '../components/Dashboard';
import CircularProgress from '@material-ui/core/CircularProgress';
import mockDonations from '../mockData';
import styled from 'styled-components';
import axios from 'axios';
import $ from 'jquery';

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 600px;
`;

const Popup = (place) => {
  const handleClaimDonation = async (donationId) => {
    const userId = localStorage.getItem('user');
    debugger
    try {
      const res = await axios.post('/users/claim', {
        userId,
        donationId,
      });
      console.log(res.data);
      alert("Success claiming donation");
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      {place.item}
      <div>
        <button onclick={() => handleClaimDonation(place._id)}>Claim</button>
      </div>
    </div>
  )
}

const MapView = () => {
  const [donations, setDonations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getUnpaidDonations = async () => {
    try {
      const res = await axios.get('/donations/unclaimed')
      if (res.data) {
        console.log('data', res.data)
        setDonations(res.data.donations);
      }
    } catch (err) {
      alert(err)
    }
    setLoaded(true)
  }

  const handleClaimDonation = async (donationId) => {
    const userId = localStorage.getItem('user');
    try {
      const res = await axios.post('/users/claim', {
        userId,
        donationId,
      });
      console.log(res.data);
      const newList = donations.filter(donation => donation._id !== donationId);
      alert("Success claiming donation");
      window.location.reload();
    } catch (err) {
      alert(err)
    }
  }

  const createMap = () => {
    const tt = window.tt;
    const map = tt.map({
      container: 'map',
      key: '4PsfUOgZG1PxD5bSDjCeQjAdR4QTk6Fp',
      style: 'tomtom://vector/1/basic-main',
      center: [-122.452715, 37.757889],
      zoom: 11
    });
    
    var popupOffsets = {
      top: [30, 0],
      bottom: [0, -70],
      'bottom-right': [0, -70],
      'bottom-left': [0, -70],
      left: [25, -35],
      right: [-25, -35]
    }
    if (donations && donations.length) {
      donations.forEach((place) => {
        if (place.pickedUp) { return; }
        if (!place.coords || !place.coords.length) { return; }
  
        const marker = new tt.Marker(<div></div>).setLngLat(place.coords).addTo(map);
        const popup = new tt.Popup({offset: popupOffsets})
        popup.setHTML(`
        <div>
        ${place.item}
        <div>
        <button id=${place._id} class="popup-btn">Claim</button>
        </div>
        </div>
      `);
        marker.setPopup(popup);
      });
    }
  }

  useEffect(() => {
    getUnpaidDonations();
  }, [])
  useEffect(() => {
      if (loaded) {
        createMap();
      }
  }, [loaded]);

  async function handleClick (e) {
    const btn = $(e.target)
    if (btn.hasClass('popup-btn')) {
      const id = btn.attr('id');
      await handleClaimDonation(id);
    }
  }
  useEffect(() => {
    window.addEventListener('click', handleClick)
    return window.addEventListener('click', handleClick)
  }, [])

  return (
    <Dashboard>
      <div>
        The Map
        { loaded? <MapContainer id='map' /> : <CircularProgress /> }
      </div>
    </Dashboard>
  );
};

export default MapView;

