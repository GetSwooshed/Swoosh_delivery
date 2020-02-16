import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { usersItems } from '../mockData';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { getLocation } from '../helpers';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const handleError = () => alert("Error getting location")
  const classes = useStyles();
  const [myItems, setItems] = useState({
    postedDonations: [],
    claimedDonations: []
  })

  const handleCreateDonation = async () => {
    setLoading(true);
    const { lat, lon } = await getLocation();
    const userId = localStorage.getItem('user');
    const item = 'Test Item';
    const data = {
      userId,
      coords: [lon, lat],
      item
    }

    try {
      const res = await axios.post('/donations', data);
      if (res.data) {
        console.log("SUCCESS", res.data)
        alert("Success creating new donation")
        setLoading(false);
        const { createdDonation } = res.data;
        data._id = createdDonation;
        setItems({
          ...myItems,
          postedDonations: [
            ...myItems.postedDonations,
            data,
          ]
        });
      }
    } catch(err) {
      alert(err)
    }
  }

  const fetchDonations = async () => {
    const userId = localStorage.getItem("user");
    try {
      const res = await axios.get(`/users/${userId}/donations`);
      setItems({
        postedDonations: res.data.postedDonations,
        claimedDonations: res.data.claimedDonations
      })
    } catch(err) {
      alert(err);
    }
  }
  useEffect(() => {
    fetchDonations();
  }, []);

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
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myItems.postedDonations.map((posted, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {posted.item}
                    </TableCell>
                    <TableCell align="right">{posted.pickedUp ? 'claimed' : 'available'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <h2>Claimed Donations</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myItems.claimedDonations.map((claimed, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {claimed.item}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Dashboard>
  );
};

export default Profile;
