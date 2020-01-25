import React, { Component } from "react";
import { Link } from "@reach/router";


import { get } from "../../utilities";
import "./Profile.css";


/**s
 * Props:
 * userId: gotten from link
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

  render() {
    const stories = this.state.storyList.map((s, i) => (
      <div key = {s._id}>
        <Link to={"/storyviewer/" + s._id + "/" + this.state.firstPages[i].toString()} className="Story-link" > {s.storyTitle} </Link>
      </div>
    ));
    return (
      <div>
        <div className="Block">
          <h1 className="Heading">Profile of {this.props.userName}</h1>
        </div>
        <hr/>
        <div className="Block">
          <h2 className="Heading">Your edited stories:</h2>
          {stories}
        </div>
        
      </div>
    );
  }
}

export default Profile;
