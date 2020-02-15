import React from 'react';
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email) {
      alert("EMAIL IS REQUIRED")
      return;
    }
    localStorage.setItem('user', this.state.email)
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
        Login
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
