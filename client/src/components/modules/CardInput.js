import React, { Component } from "react";

import { post } from "../../utilities";

/**
 * CardInput is a parent component for story input components
 *
 * Props:
 * addNewCard?????: this updates storyList in Browse when story added
 */
class CardInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueTitle: "",
      valueContent: "",
    };
  }

  addCard = (value) => {
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
    //this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.addStory(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
        /*<div className="StoryCard-container">
            <span className="Title">{this.props.card.cardTitle}</span>
            <span className="Author"> by {this.props.card.creator_name}</span>
            <hr/>
            <div> {this.props.card.content} </div>
        </div>*/
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
