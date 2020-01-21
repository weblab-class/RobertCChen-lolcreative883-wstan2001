import React, { Component } from "react";
import { Link } from "@reach/router";


import { get } from "../../utilities";


/**s
 * Props:
 * userId: gotten from link
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyList: [],
    };
  }

  componentDidMount() {
    get("/api/storiesByUserId", {userId: this.props.userId}).then((foundStories) => {
      this.setState({
        storyList: foundStories,
      });
    });
  }

  render() {
    const stories = this.state.storyList.map((s) => (
      <div key = {s._id}>
        <Link to = "/storyviewer" state ={{
          story_id: s._id,
          userId: this.props.userId,
          start_page: 0,
        }}>
          {s.storyTitle}
        </Link>
      </div>
    ));
    return (
      <div>
        <h1>This is your profile</h1>
        <h2> Your edited stories: </h2>
        <hr/>
        {stories}
      </div>
    );
  }
}

export default Profile;
