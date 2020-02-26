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
  .my-btn {
    display: none;
  }
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
  const apiKey = '4PsfUOgZG1PxD5bSDjCeQjAdR4QTk6Fp'
  const [userLocation, setUserLocation] = useState([])
  const [map, setMap] = useState(null);
  const [batchCoords, setBatchCoords] = useState([])
  const [loaded, setLoaded] = useState(false);
  let routes = [];
  const routeWeight = 9;
const routeBackgroundWeight = 12;
  const tt = window.tt;
  const getUnpaidDonations = async () => {
    const { lat, lon } = await getLocation();
    try {
      const res = await axios.get('/donations/unclaimed')
      if (res.data) {
        console.log('data', res.data)
        setDonations(res.data.donations);
        setUserLocation([lon, lat])
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
    const myMap = tt.map({
      container: 'map',
      key: apiKey,
      style: 'tomtom://vector/1/basic-main',
      center: userLocation,
      zoom: 14
    });

    setMap(myMap);
  }

  const createPins = async () => {
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
      donations.forEach(async (place) => {
        if (place.pickedUp) { return; }
        if (!place.coords || !place.coords.length) { return; }
        let newCoords = place.coords;
        let color = "#333"
        let classNm = '';
        if (place.userId === userId) {
          newCoords = getSudoRandCoords(place.coords);
          color = "#3f51b5"
          classNm = 'my-btn'
        }

        let address = '';
        if (newCoords[0] === userLocation[0]) {
          newCoords[0] = newCoords[0] + 0.005
        }
        console.log("PLACE", place.address)
        if (place.address) {
          address = place.address;
        }

        const marker = new tt.Marker({ color }).setLngLat(newCoords).addTo(map)
        const popup = new tt.Popup({offset: popupOffsets})
        popup.setHTML(`
        <div>
        ${place.item}
        <div>
          <p>${address}</p>
          <button id=${place._id} class="popup-btn ${classNm}">Claim</button>
        </div>
        </div>
      `);
        marker.setPopup(popup);
        marker.on('click', (function() {
          console.log('clicked')
        }));
      });
    }
  }

  const createPassengerMarker = async () => {
    const passengerMarkerElement = document.createElement('div');
    passengerMarkerElement.innerHTML = "<img src='https://d221h2fa9j1k6s.cloudfront.net/tomtom-guides/taxi-dispatcher/img/man-waving-arm_32.png' style='width: 30px; height: 30px';>";
    return new tt.Marker({ element: passengerMarkerElement }).setLngLat(userLocation).addTo(map);
  }

  function updateDonationBatchLocations() {
    const donationPersonBatchCoordinates = [];
    donations.forEach(donation => {
      donationPersonBatchCoordinates.push(donation.coords + ':' + userLocation);
    });
    setBatchCoords(donationPersonBatchCoordinates);
  }
  function buildStyle(id, data, color, width) {
    return {
      'id': id,
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': data
      },
      'paint': {
        'line-color': color,
        'line-width': width
      },
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      }
    }
  }

  function drawAllRoutes() {
    let bestRouteIndex

    function bringBestRouteToFront() {
      map.moveLayer(routes[bestRouteIndex][0]);
      map.moveLayer(routes[bestRouteIndex][1]);
    }

    const batchItems = batchCoords.map(coord => {
      return {
        locations: coord,
      }
    })
    tt.calculateRoute({
        batchMode: 'sync',
        key: apiKey,
        batchItems,
    })
        .go().then(function (results) {
            results.forEach(function (singleRoute, index) {
                const routeGeoJson = singleRoute.toGeoJson();
                const route = [];
                const route_background_layer_id = 'route_background_' + index;
                const route_layer_id = 'route_' + index;

                map.addLayer(buildStyle(route_background_layer_id, routeGeoJson, 'black', routeBackgroundWeight))
                    .addLayer(buildStyle(route_layer_id, routeGeoJson, donations[index].color, routeWeight));

                route[0] = route_background_layer_id;
                route[1] = route_layer_id;
                routes[index] = route;

                if (index === bestRouteIndex) {
                    const bounds = new tt.LngLatBounds();
                    routeGeoJson.features[0].geometry.coordinates.forEach(function (point) {
                        bounds.extend(tt.LngLat.convert(point));
                    });
                    map.fitBounds(bounds, { padding: 150 });
                }

                map.on("mouseenter", route_layer_id, function () {
                    map.moveLayer(route_background_layer_id);
                    map.moveLayer(route_layer_id);
                });

                map.on("mouseleave", route_layer_id, function () {
                    bringBestRouteToFront();
                });
            });
            bringBestRouteToFront();
        });
      }

  useEffect(() => { getUnpaidDonations(); }, [])
  useEffect(() => { if (loaded) { createMap(); } }, [loaded]);

  useEffect(() => {
    createPins();
    createPassengerMarker();
    // drawAllRoutes();
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

