import React, { Component } from "react";
import StoryCard from "../modules/StoryCard.js";
import CardInput from "../modules/CardInput.js";

import { get } from "../../utilities";


/**
 * Story Viewer for checking out stories
 * 
 * Props: from Browse or Profile
 * story_id: id of story to get
 * userId: tbh not sure if this necessary
 * 
 * storyCard field reference:
 *  cardTitle:
 *  creator_name:
 *  creator_id:
 *  page_num:
 *  content:
 *  done:
 * 
 * State: To store where we're at
 * story: the current story
 * page_num: self explanatory
 * pageCode: ie UUR
 * 
 * CAREFUL: the "done" prop might be outdated, so "done" state takes precedence
 */
class StoryViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        story: undefined,
        page_num: 0,
        pageCode: "",
    };
  }

  // exact copy of componentDidMount
  updateCard = (card) => {
    get("/api/storyById", {story_id: this.props.location.state.story_id}).then((foundStory) => {
        this.setState({
            story: foundStory,
        });
    });
  };

  handleSubmit = (event) => {
    console.log("button pressed");
    if (event.target.getAttribute("type") === "B")
    {
        if (this.state.page_num > 0) {
            this.setState({
                page_num: Math.floor((this.state.page_num - 1)/ 3),
                pageCode: this.state.pageCode.substring(0, this.state.pageCode.length - 1),
            });
        }
    }
    else if (event.target.getAttribute("type") === "U")
    {
        if (this.state.pageCode.length < 3) {
            this.setState({
                page_num: this.state.page_num * 3 + 1,
                pageCode: this.state.pageCode + "U",
            });
        }
    }
    else if (event.target.getAttribute("type") === "R")
    {
        if (this.state.pageCode.length < 3) {
            this.setState({
                page_num: this.state.page_num * 3 + 2,
                pageCode: this.state.pageCode + "R",
            });
        }
    }
    else if (event.target.getAttribute("type") === "D")
    {
        if (this.state.pageCode.length < 3) {
            this.setState({
                page_num: this.state.page_num * 3 + 3,
                pageCode: this.state.pageCode + "D",
            });
        }
    }
  };

  //we will need a function to refresh the storyviewer page when a new story is added
  componentDidMount() {
    get("/api/storyById", {story_id: this.props.location.state.story_id}).then((foundStory) => {
        this.setState({
            story: foundStory,
        });
    });
  }

  render() {
        if (!this.state.story){
            return (
                <div>
                    <h1>This is the Story Viewer Page!</h1>
                    <div>Fetching Story...</div>
                </div>
            );
        }
        const curCard = this.state.story.pages[this.state.page_num];
        if (curCard.done) {
            return (
                <div>
                    <h1>This is the Story Viewer Page!</h1>
                    {<StoryCard card={curCard}/>}
                    <button onClick={this.handleSubmit} type="B">
                    Back
                    </button>
                    <button onClick={this.handleSubmit} type="U">
                    Up
                    </button>
                    <button onClick={this.handleSubmit} type="R">
                    Right
                    </button>
                    <button onClick={this.handleSubmit} type="D">
                    Down
                    </button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1> This is the Story Viewer Page!</h1>
                    <CardInput updateCard = {this.updateCard} story_id = {this.props.location.state.story_id} page_num = {this.state.page_num}/>
                    <button onClick={this.handleSubmit} type="B">
                    Back
                    </button>
                    <button onClick={this.handleSubmit} type="U">
                    Up
                    </button>
                    <button onClick={this.handleSubmit} type="R">
                    Right
                    </button>
                    <button onClick={this.handleSubmit} type="D">
                    Down
                    </button>
                </div>
            );
        }
    }
}

export default StoryViewer;
