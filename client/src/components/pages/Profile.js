import React, { Component } from "react";
import { Link } from "@reach/router";


import { get, post } from "../../utilities";
import "./Profile.css";


/**s
 * Props:
 * userId: gotten from link
 * userName: gotten from app
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdStories: [],
      contributedStories: [],
      storyList: [],
      firstPages: [],
    };
  }

  componentDidMount() {
    get("/api/storiesByUserId", {userId: this.props.userId}).then((foundStories) => {
      let newFP = [];
      let newCreatedStories = [];
      let newContributedStories = [];
      for (let i = 0; i < foundStories.length; i++) {
        if (foundStories[i].author_id === this.props.userId) {
          newCreatedStories.push(foundStories[i])
        } else {
          newContributedStories.push(foundStories[i])
        }

        let j  = 0;
        while (!foundStories[i].pages[j] || foundStories[i].pages[j].creator_id != this.props.userId) {
          j++;
          if (j > 200){
            j = 0;
            break;
          }
        }
        newFP.push(j);
      }
      
      this.setState({
        createdStories: newCreatedStories,
        contributedStories: newContributedStories,
        storyList: foundStories,
        firstPages: newFP,
      });
    });
  }

  handleDelete = (event) => {
    const delNum = event.target.getAttribute("num");
    post("/api/deleteStory", {story_id: this.state.storyList[delNum]._id}).then((ret) => console.log("deleted a story!"));
    this.state.storyList.splice(delNum, 1);
    this.state.createdStories.splice(delNum, 1);
    this.state.firstPages.splice(delNum, 1);
    this.setState({
      createdStories: this.state.createdStories,
      storyList: this.state.storyList,
      firstPages: this.state.firstPages,
    });
  };

  render() {
    const createdStories = this.state.createdStories.map((s, i) => (
      <div key = {s._id}>
        <button className="Profile-Delete-Button" onClick={this.handleDelete} num={i}>
                Delete
        </button>
        <Link to={"/storyviewer/" + s._id + "/0"} className="Story-link" > {s.storyTitle} </Link>
      </div>
    ));

    const contributedStories = this.state.contributedStories.map((s, i) => (
      <div key = {s._id}>
        <Link to={"/storyviewer/" + s._id + "/" + this.state.firstPages[i].toString()} className="Story-link" > {s.storyTitle} </Link>
      </div>
    ));
    if (this.props.userName)  {
      return (
        <div>
          <div className="Profile-Block">
            <h1 className="Heading">Profile of {this.props.userName}</h1>
          </div>
          <hr/>
          <div className="Profile-BlockDelay">
            <h2 className="Heading">Stories you've created:</h2>
            {createdStories}
            <h2 className="Heading">Stories you've contributed to:</h2>
            {contributedStories}
          </div>
          
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="Profile-Block">
            <h1 className="Heading">Profile</h1>
          </div>
          <hr/>
          <div className="Profile-BlockDelay">
            <div className="Profile-Regular-Text"> You have logged out. Please return to another page. </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
