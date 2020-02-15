import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    }
  }

  
  render() {
    return (
      <div>
        Login
        <form>
          <input
            name="email"
            type="email"
            value={this.state.email}
          />
        </form>
      </div>
    )
  }
}

export default Login;
