import React, { Component } from "react";
import { Link } from "@reach/router";
import StoryInput from "../modules/StoryInput.js";

import { get, post } from "../../utilities";
import "./Browse.css";


/**
 * Browser Window
 * 
 * Props: from App
 * userId: user's ID, need to pass this to storyViewer
 */
class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
        storyList: undefined,
    };
  }

  componentDidMount() {
    get("/api/stories").then((storyObjs) => {
      this.setState({
        storyList: storyObjs,
      });
    });
  }

  addNewStory = (storyObj) => {
    this.setState({
      storyList: this.state.storyList.concat([storyObj]),
    });
  }

  render() {
    if (!this.state.storyList) {
      return (
        <div/>
      );
    }
    let stories = this.state.storyList.map(s => (
      <div key={s._id}>
        <Link to={"/storyviewer/" + s._id + "/0"} className="Story-link" > {s.storyTitle} </Link>
      </div>
    ));

    let recentThreeStories = stories.slice(Math.max(stories.length - 3, 1)).reverse();

    return (
      <div>
        <div className="Block">
          <h1 className = "Heading"> Add a Story </h1>
          <StoryInput addNewStory = {this.addNewStory}/>
        </div>
        <div className="BlockDelay">
          <h1 className="Heading">Most Recent</h1>
          {recentThreeStories}
        </div>
        <div className="BlockDelay">
          <h1 className="Heading">All Stories</h1>
          {stories}
        </div>
      </div>
    );
  }
}

export default Browse;
