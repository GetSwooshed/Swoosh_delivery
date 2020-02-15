import React, { useState } from 'react';


const Profile = () => {
  const [loading, setLoading] = useState(false);
  // userId
  // coordinates: [x, y]

  const handleError = () => alert("Error getting location")
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
    <div>
      <h1>My Profile</h1>
      <div>
        <button disabled={loading} onClick={handleCreateDonation}>New Donation</button>
        {loading && <p>Loading...</p>}
      </div>
      <div>
        <h2>Items</h2>
      </div>
    </div>
  );
};

export default Profile;
