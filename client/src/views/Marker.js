import React, { useEffect } from 'react';
import styles from './Marker.css';
import mockDonations from '../mockData';

const Marker = () => {


  useEffect(() => {
    const tt = window.tt;
    var map = tt.map({
      container: 'map',
      key: '4PsfUOgZG1PxD5bSDjCeQjAdR4QTk6Fp',
      style: 'tomtom://vector/1/basic-main',
      center: [-122.452715, 37.757889],
      zoom: 11
    });
    
    var popupOffsets = {
      top: [0, 0],
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
      // const coordinates = place.coords.map(item => parseInt(item));
      var marker = new tt.Marker().setLngLat(place.coords).addTo(map);
      var popup = new tt.Popup({offset: popupOffsets}).setHTML(`${place.item}`);
      marker.setPopup(popup).togglePopup();
    });

    // var marker = new tt.Marker().setLngLat(speedyPizzaCoordinates).addTo(map);
    // var change = new tt.Marker().setLngLat(hayesValley).addTo(map);
    // var test = new tt.Marker().setLngLat(ice).addTo(map);

    // var popup = new tt.Popup({offset: popupOffsets}).setHTML("<b>Pied Piper</b>, San Francisco, CA");
    // marker.setPopup(popup).togglePopup();
    // var HV = new tt.Popup({offset: popupOffsets}).setHTML("<b>Hayes Valley</b>, SF, CA")
    // change.setPopup(HV).togglePopup();
    // var iceland = new tt.Popup({offset: popupOffsets}).setHTML("<b>icelandia</b>, SF, CA")
    // test.setPopup(iceland).togglePopup();

  }, []);

  return (
  <div>
    The Map
    <div id='map' />
  </div>
)};

export default Marker;

