import React, { Component } from "react";
import { Link } from "@reach/router";
import StoryInput from "../modules/StoryInput.js";

import { get, post } from "../../utilities";


/**
 * Browser Window
 * 
 * Props: from App
 * userId: user's ID, need to pass this to storyViewer
 */
class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
        storyList: [
        {
            storyTitle: "Chicken Tenders",
            _id: "CT",
            author: "not Stanley Wang",
            author_id: "SW",
            pages: [
              {cardTitle: "Chicken Tenders 0",
               creator_id: "340",
               creator_name: "Shrek",
               content: "Gimme gimme chicken tendies, Be they crispy or from Wendys.",
               done: true,
              },
              {cardTitle: "Chicken Tenders 1",
               creator_id: "341",
               creator_name: "Fiona",
               content: "Spend my hard-earned good-boy points, on Kid's Meal ball pit burger joints.",
               done: true,
              },
              {cardTitle: "Chicken Tenders 2",
               creator_id: "3325",
               creator_name: "Donkey",
               content: "Mummy lifts me to the car, To find me tendies near and far.",
               done: true,
              },
              {cardTitle: "Chicken Tenders 3",
               creator_id: "37456",
               creator_name: "Farquaad",
               content: "Enjoy my tasty tendie treats, in comfy big boy booster seats.",
               done: true,
              },
              {cardTitle: "Chicken Tenders 4",
               creator_id: "31568",
               creator_name: "Gingy",
               content: "McDonald's, Hardee's, Popeye's, Cane's, But of my tendies none remains.",
               done: true,
              },
              {cardTitle: "Chicken Tenders 5",
               creator_id: "5468",
               creator_name: "FG",
               content: "She tries to make me take a nappy, But sleeping doesn't make me happy.",
               done: true,
              },
            ],
        },
      ],
    };
  }

  componentDidMount() {
    get("/api/stories").then((storyObjs) => {
      this.setState({
        storyList: storyObjs,
      });
    });
  }

  addNewStory = (storyObj) => {
    this.setState({
      storyList: this.state.storyList.concat([storyObj]),
    });
  }

  render() {
    let stories = this.state.storyList.map(s => (
      <div key={s._id}>
        <Link to={"/storyviewer"} state={{
          story_id: s._id,
          userId: this.props.userId,
        }}> {s.storyTitle} </Link>
      </div>
    ));
    return (
      <div>
        <h1>This is the browsing page</h1>
        {stories}
        <h1> Now here is a submit button! </h1>
        <StoryInput addNewStory = {this.addNewStory}/>
      </div>
    );
  }
}

export default Browse;
