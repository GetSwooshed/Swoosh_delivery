import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { usersItems } from '../mockData';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Modal from '../components/Modal';
import { getLocation } from '../helpers';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

const Status = styled.div`
  width: auto;
  text-align: center;
  border-radius: 5px;
  padding: 2px 0;
  &.claimed {
    background: lightblue;
  }

  &.available {
    background: #a9eabd;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleError = () => alert("Error getting location")
  const classes = useStyles();
  const [myItems, setItems] = useState({
    postedDonations: [],
    claimedDonations: []
  })

  const handleUpdateItems = (item) => {
    setItems({
      ...myItems,
      postedDonations: [
        ...myItems.postedDonations,
        item,
      ]
    })
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

  const handleDelete = async (id) => {
    const res = await axios.delete(`/donations/${id}`);
    if (res.data) {
      const newList = myItems.postedDonations.filter(item => item._id !== id);
      setItems({
        ...myItems,
        postedDonations: [...newList]
      })
    }
  }
  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <Dashboard>
      <div>
        <Header>
          <h1>My Profile</h1>
          <div>
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => setModalOpen(true)}
              color="primary"
            >
              New Donation
            </Button>
            {loading && <p>Loading...</p>}
          </div>

        </Header>
        <div>
          <h2>My Donations</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myItems.postedDonations.map((posted, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {posted.item}
                    </TableCell>
                    <TableCell><Status className={posted.pickedUp ? 'claimed' : 'available'}>{posted.pickedUp ? 'claimed' : 'available'}</Status></TableCell>
                    <TableCell align="right" onClick={() => handleDelete(posted._id)}><DeleteIcon /></TableCell>
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
      <Modal
        open={modalOpen}
        toggleModal={setModalOpen}
        updateItems={handleUpdateItems}
      />
    </Dashboard>
  );
};

export default Profile;
