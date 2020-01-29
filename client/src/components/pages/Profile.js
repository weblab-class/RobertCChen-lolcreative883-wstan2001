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
      storyList: [],
      firstPages: [],
    };
  }

  componentDidMount() {
    get("/api/storiesByUserId", {userId: this.props.userId}).then((foundStories) => {
      let newFP = [];
      for (let i = 0; i < foundStories.length; i++) {
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
        storyList: foundStories,
        firstPages: newFP,
      });
    });
  }

  handleDelete = (event) => {
    const delNum = event.target.getAttribute("num");
    post("/api/deleteStory", {story_id: this.state.storyList[delNum]._id}).then((ret) => console.log("deleted a story!"));
    this.state.storyList.splice(delNum, 1);
    this.state.firstPages.splice(delNum, 1);
    this.setState({
      storyList: this.state.storyList,
      firstPages: this.state.firstPages,
    });
  };

  render() {
    const stories = this.state.storyList.map((s, i) => (
      <div key = {s._id}>
        <button className="Profile-Delete-Button" onClick={this.handleDelete} num={i}>
                Delete
        </button>
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
            <h2 className="Heading">Your edited stories:</h2>
            {stories}
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
