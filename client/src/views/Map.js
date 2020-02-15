import React, { useEffect } from 'react';
import styles from './Map.css';

const MapView = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
    document.body.appendChild(script);
    script.async = true;
    script.onload = function () {
      window.tomtom.L.map('map', {
        source: 'vector',
        key: '4PsfUOgZG1PxD5bSDjCeQjAdR4QTk6Fp',
        // center: [37.769167, -122.478468],
        center: [37.7759, - 122.4245],
        basePath: '/sdk',
        zoom: 15
      });
    }
  }, []);

  return (
  <div>
    The Map
    <div id='map' />
  
  </div>
)};

export default MapView;

