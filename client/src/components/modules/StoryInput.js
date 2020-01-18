import React, { Component } from "react";

import { post } from "../../utilities";

/**
 * StoryInput is a parent component for story input components
 *
 * Props:
 * @param {string} 
 * userId: user's ID
 * 
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
      author_id: this.props.userId,
      pages: ["1", "2", "3"],
    };
    post("/api/story", body).then((story) => {
      console.log("Added new story via submit button");
      // TODO: Add code here to update some storyList?
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
    //this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.addStory(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div /*className="u-flex"*/>
        <input
          type="text"
          placeholder={"Enter Story Here"}
          value={this.state.value}
          onChange={this.handleChange}
          //className="NewPostInput-input"
        />
        <button
          type="submit"
          //className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}


export default StoryInput;
