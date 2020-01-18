import React, { Component } from "react";
import StoryCard from "../modules/StoryCard.js";
import StoryInput from "../modules/StoryInput.js";

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
    return (
      <div>
        <h1>This is the Story Viewer Page!</h1>
        {<StoryCard card={{
            cardTitle: "Chicken Tendies",
            creator_id: "148534",
            creator_name: "not Stanley Wang",
            content: "Tendies are the only food, That puts me in the napping mood. I'll scream and shout and make a fuss, I'll scratch, I'll bite, I'll even cuss! Tendies are my heart's desire, Fueled by raging, hungry fire. Mummy sobs and wails and cries, But tears aren't tendies, nugs or fries. My good-boy points were fairly earned, To buy the tendies that I've yearned. But there's no tendies on my plate! Did mummy think that I'd just ate? 'TENDIES TENDIES GET THEM NOW, YOU FAT, UNGRATEFUL, SLUGGISH SOW!' I screech while hurling into her eyes, My foul-smell bowel-dwelling diaper surprise. For she who is un-pooped on is she who remembers: Never forget my chicken tenders.",
            done: true,
        }}/>}
        <h1> Now here is a submit button! </h1>
        <StoryInput userId = {this.props.userId}/>
      </div>
    );
  }
}

export default StoryViewer;
