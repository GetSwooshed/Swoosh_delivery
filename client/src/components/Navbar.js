import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 75px;
  border-bottom: solid 1px #333;
  align-items: center;


  .links {
    display: flex;
    align-items: center;

    a { 
      margin-right: 5px;
    }
  }
`;

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    history.push('/');
  }

  useEffect(() => {
    console.log("history", history.location.pathname)
    if (localStorage.getItem('user')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [history.location.pathname])
  return (
  <Container>
    <div>Swoosh</div>
    <div className="links">
      {
        loggedIn && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/map">Map</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
      )}
    </div>
  </Container>
)}

export default Navbar;
