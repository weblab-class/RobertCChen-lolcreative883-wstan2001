import React, { Component } from "react";
import StoryCard from "../modules/StoryCard.js";
import CardInput from "../modules/CardInput.js";

/**
 * Story Viewer for checking out stories
 * 
 * Props: from Browse or Profile
 * story: at minimum must have storyObj
 *      storyTitle:
 *      _id: this is the story id created by MongoDB
 *      author:
 *      author_id:
 *      pages: []
 * userId: user's ID, need this to post stories
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
 * pagenum: self explanatory
 * pageCode: ie UUR
 */
class StoryViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pagenum: 0,
        pageCode: "",
    };
  }

  //we will need a function to refresh the storyviewer page when a new story is added

  render() {
    const curCard = this.props.location.state.story.pages[this.state.pagenum];
    if (curCard.done) {
        return (
        <div>
            <h1>This is the Story Viewer Page!</h1>
            {<StoryCard card={curCard}/>}
        </div>
        );
    }
    else {
        return (
            <div>
                <h1> This is the Story Viewer Page!</h1>
                <CardInput story_id = {this.props.location.state.story._id} page_num = {this.state.page_num}/>
                {console.log(this.props.location.state.story._id)}
            </div>
        );
    }
  }
}

export default StoryViewer;
