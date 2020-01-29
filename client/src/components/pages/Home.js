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
      <center><h1 className="HomeTitle">Welcome.</h1></center>
      <img src={Image} className="Logo"/>
      <h1 className="HomeTitle2">Hey, Author!</h1>
      <center>
      <div class="typewriter">
        <div class="typewriter-text">Welcome to Melting Plot, a choose-your-own-adventure-esque, story-writing collaboration platform you never knew you needed!</div>
      </div>

  <p></p>

      <div class="typewriter">
        <div class="typewriter-text2">We, Team Git Bashed, created this website to give writers a chance to gather and volunteer their creative spirit, one step at a time!</div>
      </div>

  <p></p>

      <div class="typewriter">
        <div class="typewriter-text3">Create new stories! Inspire others! Raise awareness!</div>
      </div>

  <p></p>

      <div class="typewriter">
        <div class="typewriter-text4">The pen is in your hands... start creating! Hit the Browse button to look through stories or start your own!</div>
      </div>

      </center>

      </>
    );
  }
}


export default Home;
