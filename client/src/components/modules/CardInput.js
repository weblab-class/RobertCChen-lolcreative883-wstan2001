import React, { Component } from "react";

import { post } from "../../utilities";

/**
 * CardInput is a parent component for story input components
 *
 * Props:
 * story_id: story id from StoryViewer
 * page_num: page number of story from StoryViewer
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

  addCard = (valueTitle, valueContent) => {
    const body = { 
      story_id: this.props.story_id,
      page_num: this.props.page_num,
      cardTitle: valueTitle,
      content: valueContent,
    };
    post("/api/card", body).then((story) => {
      console.log("Added new card via card submit button");
      //later will code something here to tell StoryViewer to update
      //this.props.addNewStory(story);
    });
  };

  // called whenever the user types in the new post input box
  handleChangeTitle = (event) => {
    this.setState({
      valueTitle: event.target.value,
    });
  };

  handleChangeContent = (event) => {
    this.setState({
      valueContent: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    //this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.addCard(this.state.valueTitle, this.state.valueContent);
    this.setState({
      valueTitle: "",
      valueContent: "",
    });
  };

  render() {
    return (
        <div className="StoryCard-container">
            <span>
                <input
                type="text"
                placeholder={"Enter Card Title Here"}
                value={this.state.valueTitle}
                onChange={this.handleChangeTitle}
                />
            </span>
            <hr/>
            <div> 
                <input
                type="text"
                placeholder={"Enter Card Content Here"}
                value={this.state.valueContent}
                onChange={this.handleChangeContent}
                />
            </div>
            <div /*className="u-flex"*/>
                <button
                type="submit"
                //className="NewPostInput-button u-pointer"
                value="Submit"
                onClick={this.handleSubmit}
                >
                Submit
                </button>
            </div>
        </div>
    );
  }
}


export default CardInput;
