import React, { useEffect } from 'react';
// import styles from './Map.css';
import Dashboard from '../components/Dashboard';
import mockDonations from '../mockData';
import styled from 'styled-components';

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 600px;
`;

const MapView = () => {

  useEffect(() => {
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
    
    mockDonations.forEach((place) => {
      if (place.pickedUp) {
        return;
      }

      const marker = new tt.Marker(<div></div>).setLngLat(place.coords).addTo(map);
      const popup = new tt.Popup({offset: popupOffsets}).setHTML(`
        <div>
        ${place.item}
        <div>
        <button onclick={alert('hello!')}>Claim</button>
        </div>
        </div>
        `);
      marker.setPopup(popup);
    });

  }, []);
  return (
    <Dashboard>
      <div>
        The Map
        <MapContainer id='map' />
      </div>
    </Dashboard>
  );
};

export default MapView;

