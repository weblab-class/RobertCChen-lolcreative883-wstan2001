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
      this.setState({
        storyList: foundStories,
      });
      let newFP = [];
      for (let i = 0; i < this.state.storyList.length; i++) {
        let j  = 0;
        while (!this.state.storyList[i].pages[j] || this.state.storyList[i].pages[j].creator_id != this.props.userId) {
          j++;
          if (j > 200){
            j = 0;
            break;
          }
        }
        newFP.push(j);
      }
      this.setState({
        firstPages: newFP,
      });
      console.log(newFP);
    });
  }

  render() {
    const stories = this.state.storyList.map((s, i) => (
      <div key = {s._id}>
        <Link to = "/storyviewer" className="Story-link" state ={{
          story_id: s._id,
          userId: this.props.userId,
          start_page: this.state.firstPages[i],
        }}>
          {s.storyTitle}
        </Link>
      </div>
    ));
    return (
      <div>
        <div className="Block">
          <h1 className="Heading">This is your profile</h1>
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
