import React, { Component } from "react";
import StoryCard from "../modules/StoryCard.js";

/**
 * Story Viewer for checking out stories
 * 
 * Props: from Browse or Profile
 * story: at minimum must have storyObj
 *      storyTitle:
 *      story_id:
 *      author:
 *      author_id:
 *      pages: []
 * userId: user's ID, need this to post stories
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

  render() {
    const curCard = this.props.location.state.story.pages[this.state.pagenum];
    return (
      <div>
        <h1>This is the Story Viewer Page!</h1>
        {<StoryCard card={curCard}/>
        }
      </div>
    );
  }
}

export default StoryViewer;
