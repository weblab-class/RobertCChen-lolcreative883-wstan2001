import React, { Component } from "react";

import "./CardInput.css";

import { post } from "../../utilities";

/**
 * CardInput is a parent component for story input components
 *
 * Props:
 * story_id: story id from StoryViewer
 * page_num: page number of story from StoryViewer
 * page_code: page code from StoryViewer
 * updateCard: this updates card in storyviewer when card added
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
      this.props.updateCard();
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
    console.log(this.props.userId)
    if (this.props.userId) {
      return (
        <div className="CardInput-container">
            <div className="Input-TitleAuth-Container">
              <div className="Muli-Font"> Now editing page {this.props.page_num}</div>
              <span>
                  <input
                  type="text"
                  placeholder={"Enter Card Title Here"}
                  value={this.state.valueTitle}
                  onChange={this.handleChangeTitle}
                  className="Title-Input"
                  />
              </span>
            </div>
            <hr/>
            <div> 
                <textarea
                type="text"
                placeholder={"Enter Card Content Here"}
                value={this.state.valueContent}
                onChange={this.handleChangeContent}
                className = "Text-Input"
                />
            </div>
            <div /*className="u-flex"*/>
                <button
                type="submit"
                //className="NewPostInput-button u-pointer"
                value="Submit"
                onClick={this.handleSubmit}
                className="submitButton"
                >
                Submit
                </button>
            </div>
        </div>
      );
    } else {
      return (
        <div className="CardInput-container">
            <div className="Input-TitleAuth-Container">
              <div className="Muli-Font"> Now editing page {this.props.page_num}</div>
              <span>
                  <input
                  type="text"
                  placeholder={"Enter Card Title Here"}
                  value={this.state.valueTitle}
                  onChange={this.handleChangeTitle}
                  className="Title-Input"
                  />
              </span>
            </div>
            <hr/>
            <div> 
                <textarea
                type="text"
                placeholder={"Enter Card Content Here"}
                value={this.state.valueContent}
                onChange={this.handleChangeContent}
                className = "Text-Input"
                />
            </div>
            <div className="Muli-Font" key={this.props.userId}>
                Please log in to save changes.
            </div>
        </div>
      );
    }
  }
}


export default CardInput;
