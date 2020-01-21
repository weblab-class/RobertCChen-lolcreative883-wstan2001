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
 * start_page: page to start on
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
 * page_code: ie UUR
 * 
 * CAREFUL: the "done" prop might be outdated, so "done" state takes precedence
 */
class StoryViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        story: undefined,
        page_num: 0,
        page_code: "",
    };
  }

  // exact copy of componentDidMount, but with no page jumping
  updateCard = (card) => {
    get("/api/storyById", {story_id: this.props.location.state.story_id}).then((foundStory) => {
        this.setState({
            story: foundStory,
        });
    });
  };

  handleSubmit = (event) => {
    if (event.target.getAttribute("type") === "B")
    {
        if (this.state.page_num > 0) {
            this.setState({
                page_num: Math.floor((this.state.page_num - 1)/ 3),
                page_code: this.state.page_code.substring(0, this.state.page_code.length - 1),
            });
        }
    }
    else if (event.target.getAttribute("type") === "U")
    {
        if (this.state.page_code.length < 3) {
            this.setState({
                page_num: this.state.page_num * 3 + 1,
                page_code: this.state.page_code + "U",
            });
        }
    }
    else if (event.target.getAttribute("type") === "R")
    {
        if (this.state.page_code.length < 3) {
            this.setState({
                page_num: this.state.page_num * 3 + 2,
                page_code: this.state.page_code + "R",
            });
        }
    }
    else if (event.target.getAttribute("type") === "D")
    {
        if (this.state.page_code.length < 3) {
            this.setState({
                page_num: this.state.page_num * 3 + 3,
                page_code: this.state.page_code + "D",
            });
        }
    }
  };

  //we will need a function to refresh the storyviewer page when a new story is added
  componentDidMount() {
    get("/api/storyById", {story_id: this.props.location.state.story_id}).then((foundStory) => {
        let code = "";
        let num  = this.props.location.state.start_page;
        while (num > 0) {
            if (num % 3 === 1) {
                code += "U";
            }
            else if (num % 3 === 2) {
                code += "R";
            }
            else if (num % 3 === 0){
                code += "D";
            }
            num = Math.floor((num - 1) / 3);
        }
        code = code.split('').reverse().join('');
        this.setState({
            story: foundStory,
            page_num: this.props.location.state.start_page,
            page_code: code,
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
                    <CardInput updateCard = {this.updateCard} story_id = {this.props.location.state.story_id} page_num = {this.state.page_num} page_code = {this.state.page_code}/>
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
