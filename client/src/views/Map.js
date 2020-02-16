import React, { useEffect } from 'react';
import styles from './Map.css';
import Dashboard from '../components/Dashboard';

const MapView = () => {


  return (
    <Dashboard>
      <div>
        The Map
        <div id='map' />
      </div>
  </Dashboard>
)};

export default MapView;

