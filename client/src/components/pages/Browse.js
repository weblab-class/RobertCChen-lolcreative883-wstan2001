import React, { Component } from "react";
import { Link } from "@reach/router";
import StoryInput from "../modules/StoryInput.js";

import { post } from "../../utilities";


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
        storyList: [{
            storyTitle: "1984",
            story_id: "1984",
            author: "George Orwell",
            author_id: "GO",
            pages: [],
        },
        {
            storyTitle: "Crime and Punishment",
            story_id: "Crime and Punishment",
            author: "Fyodor Dostoevsky",
            author_id: "FD",
            pages: [],
        },
        {
            storyTitle: "Beloved",
            story_id: "Beloved",
            author: "Toni Morrison",
            author_id: "TM",
            pages: [],
        },
        {
            storyTitle: "Chicken Tenders",
            story_id: "Chicken Tenders",
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
    //probably need to do an api call to grab data here
    const body = {
      storyTitle: "Actual Pages Now",
      pages: [
        {cardTitle: "Chicken Tenders 5",
        creator_id: "5468",
        creator_name: "FG",
        content: "She tries to make me take a nappy, But sleeping doesn't make me happy.",
        done: true,
        }
      ],
    };
    post("/api/story", body).then((story) => {
      console.log("Added story to MongoDB?");
      /*this.setState({
        storyList: [story].concat(this.state.storyList),
      });*/
    });
  }

  render() {
    let stories = this.state.storyList.map(s => (
      /*<Link to={`/storyviewer/${s.story_id}`}>
                Browse
      </Link>*/
        //div key={s.story_id}> {s.storyTitle} </div>
        <div key={s.story_id}>
          <Link to={"/storyviewer"}> {s.storyTitle} </Link>
        </div>
    ));
    return (
      <div>
        <h1>This is the browsing page</h1>
        {stories}
        <h1> Now here is a submit button! </h1>
        <StoryInput userId = {this.props.userId}/>
      </div>
    );
  }
}

export default Browse;
