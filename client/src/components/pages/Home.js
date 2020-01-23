import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Home.css";
import Image from "../../public/meltingplot.png";

//DONE: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "1085650892312-g9vj8eqaif6iug3qu3863i47ebj2hg86.apps.googleusercontent.com";

/** 
* Props: from App
* path: for web address
* handleLogin: 
* handleLogout: 
* userId: user's ID, from App
*/
class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <h1 className="Title">Welcome.</h1>
        <img src={Image} className="Logo"/>
      </>
    );
  }
}

export default Home;
