import React, { useEffect, useState } from 'react';
// import styles from './Map.css';
import Dashboard from '../components/Dashboard';
import CircularProgress from '@material-ui/core/CircularProgress';
import mockDonations from '../mockData';
import styled from 'styled-components';
import axios from 'axios';
import { getLocation } from '../helpers';
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
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const tt = window.tt;
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
      alert("Success claiming donation");
      window.location.reload();
    } catch (err) {
      alert(err)
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getSudoRandCoords (coords) {
    const rand = getRandomInt(4);
    const newFlt = rand / 1000
    const newLon = coords[0] - newFlt

    const latRand = getRandomInt(9);
    const newLatFlt = latRand / 1000
    const newLat = coords[1] + newLatFlt;
    return [newLon, newLat];
  }

  const createMap = async () => {
    const { lat, lon } = await getLocation();
    const myMap = tt.map({
      container: 'map',
      key: '4PsfUOgZG1PxD5bSDjCeQjAdR4QTk6Fp',
      style: 'tomtom://vector/1/basic-main',
      center: [ lon, lat],
      zoom: 14
    });

    setMap(myMap);
  }

  const createPins = () => {
    var popupOffsets = {
      top: [30, 0],
      bottom: [0, -70],
      'bottom-right': [0, -70],
      'bottom-left': [0, -70],
      left: [25, -35],
      right: [-25, -35]
    }
    const userId = localStorage.getItem('user');
    if (donations && donations.length) {
      donations.forEach((place) => {
        if (place.pickedUp) { return; }
        if (!place.coords || !place.coords.length) { return; }
        let newCoords = place.coords;
        if (place.userId === userId) {
          newCoords = getSudoRandCoords(place.coords);
        }
        const marker = new tt.Marker(<div></div>).setLngLat(newCoords).addTo(map);
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

  const createPassengerMarker = async () => {
    const { lat, lon } = await getLocation();
    const markerCoordinates = [lon,lat];
    const passengerMarkerElement = document.createElement('div');
    passengerMarkerElement.innerHTML = "<img src='https://d221h2fa9j1k6s.cloudfront.net/tomtom-guides/taxi-dispatcher/img/man-waving-arm_32.png' style='width: 30px; height: 30px';>";
    return new tt.Marker({ element: passengerMarkerElement }).setLngLat(markerCoordinates).addTo(map);
}

  useEffect(() => { getUnpaidDonations(); }, [])
  useEffect(() => { if (loaded) { createMap(); } }, [loaded]);

  useEffect(() => {
    createPins();
    createPassengerMarker();
  }, [map])

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

  // useEffect(() => {
  //   $('.popup-btn').each((btn) => {
  //     console.log(btn);
  //   })
  // }, [])

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

