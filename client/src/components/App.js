import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Browse from "./pages/Browse.js";
import Profile from "./pages/Profile.js";
import Nav from "./modules/Nav.js";
import StoryViewer from "./pages/StoryViewer.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <Nav 
          handleLogin = {this.handleLogin}
          handleLogout = {this.handleLogout}
          userId = {this.state.userId}
        />
        <div /*className = App-Container*/ >
          <Router>
            <Home
              path="/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />
            <Browse userId = {this.state.userId}
              path="/browse"
            />
            <Profile
              path="/profile/:userId"
            />
            <StoryViewer
              //path="storyviewer/:story_id"
              path="/storyviewer"
              userId = {this.state.userId}
            />
            <NotFound default />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
