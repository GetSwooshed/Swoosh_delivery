import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import { usersItems } from '../mockData';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const handleError = () => alert("Error getting location")
  console.log(usersItems)
  const handleCreateDonation = async () => {
    setLoading(true);
    const userId = localStorage.getItem('user');
    await navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      console.log(coords)
      const item = 'Test Item';
      const data = {
        userId,
        coordinates: [latitude, longitude],
        item
      }
      setTimeout(() => {
        console.log("SUCCESS")
        alert(JSON.stringify(data))
        setLoading(false);
      }, 1000)
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
