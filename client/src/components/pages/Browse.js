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
        <div>
          <span className="Regular-Text"> Now Fetching Stories... </span>
        </div>
      );
    }
    let stories = this.state.storyList.map(s => (
      <div key={s._id}>
        <Link to={"/storyviewer"} className="Story-link" state={{
          story_id: s._id,
          userId: this.props.userId,
          start_page: 0,
        }}> {s.storyTitle} </Link>
      </div>
    ));
    return (
      <div>
        <div className="Block">
          <h1 className="Heading">All Stories</h1>
          {stories}
        </div>
        <br/>
        <br/>
        <br/>
        <div className="Block">
          <h1 className = "Heading"> Add a Story </h1>
          <StoryInput addNewStory = {this.addNewStory}/>
        </div>
      </div>
    );
  }
}

export default Browse;
