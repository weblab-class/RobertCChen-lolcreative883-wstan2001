import React, { Component } from "react";

import { post } from "../../utilities";

import "./StoryInput.css";

/**
 * StoryInput is a parent component for story input components
 *
 * Props:
 * addNewStory: this updates storyList in Browse when story added
 */
class StoryInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  addStory = (value) => {
    const body = { 
      storyTitle: value,
    };
    post("/api/story", body).then((story) => {
      console.log("Added new story via submit button");
      this.props.addNewStory(story);
    });
  };

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.addStory(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder={"Enter Title Here"}
          value={this.state.value}
          onChange={this.handleChange}
          className="Input-Bar"
        />
        <button
          type="submit"
          //className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
          className="Submit"
        >
          Add
        </button>
      </div>
    );
  }
}


export default StoryInput;
