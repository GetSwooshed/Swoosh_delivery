import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import { usersItems } from '../mockData';
import axios from 'axios';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const handleError = () => alert("Error getting location")
  console.log(usersItems)
  const handleCreateDonation = async () => {
    setLoading(true);
    const userId = localStorage.getItem('user');
    await navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      console.log(coords)
      const item = 'Test Item';
      const data = {
        userId,
        coordinates: [longitude, latitude],
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
    }, handleError);
  }

  return (
    <Dashboard>
      <div>
        <h1>My Profile</h1>
        <div>
          <button disabled={loading} onClick={handleCreateDonation}>New Donation</button>
          {loading && <p>Loading...</p>}
        </div>
        <div>
          <h2>My Donations</h2>
          <ul>
          {usersItems.claimedDonations.map((claimed, i) => {
            return (
              <li key={i}>{claimed.item}</li>
            )
          })}
          </ul>
        </div>
        <div>
          <h2>Claimed Donations</h2>
          <ul>
          {usersItems.postedDonations.map((posted, i) => {
            return (
              <li key={i}>{posted.item}</li>
            )
          })}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default Profile;
