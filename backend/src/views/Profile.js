import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../styles/global.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        
      </div>
    );
  }
}

export default Home;
