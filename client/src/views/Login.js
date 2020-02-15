import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login = () => {
  const [ email, setEmail ] = useState('');
  const history = useHistory();
  function handleChange (e) {
    e.preventDefault();
    const { value } = e.target;
    setEmail(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      alert("EMAIL IS REQUIRED")
      return;
    }
    localStorage.setItem('user', email)
    setEmail('')
    history.push('/');
  }
  
    return (
      <div>
        Login
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    )
  }

export default Login;
