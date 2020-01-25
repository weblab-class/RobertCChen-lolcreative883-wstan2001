import React, { Component } from "react";

import { get, post } from "../../utilities";

import "./StoryCard.css";

/**
 * Story Card to display stories
 * 
 * Props: from StoryViewer
 * userId: from StoryViewer
 * story_id: from StoryViewer
 * card: at minimum must have StoryCard
 *      cardTitle: 
 *      creator_id:
 *      creator_name: 
 *      page_num:
 *      content:
 *      done: if card is filled out or nah
 */
class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numLikes: 0,
      liked: false,
    };
  }

  handleSubmit = (event) => {
    if (this.props.userId && this.state.liked === false) {
      post("/api/like", {
        story_id: this.props.story_id, 
        page_num: this.props.card.page_num,
      }).then((story) => {
        this.setState({
          numLikes: this.state.numLikes + 1,
          liked: true,
        });
      });
    }
    else if (this.props.userId && this.state.liked === true) {
      post("/api/unlike", {
        story_id: this.props.story_id, 
        page_num: this.props.card.page_num,
      }).then((story) => {
        this.setState({
          numLikes: this.state.numLikes - 1,
          liked: false,
        });
      });
    }
  };

  componentDidMount() {
    //need to check whether we have like this story
    console.log("component mounted");
    get("/api/getLikes", {
      story_id: this.props.story_id,
      page_num: this.props.card.page_num,
    }).then((thing) => {
      this.setState({
        numLikes: thing.num,
      });
    });
    if (this.props.userId){
      get("/api/isLiked", {
        story_id: this.props.story_id,
        page_num: this.props.card.page_num,
      }).then((thing) => {
        this.setState({
          liked: thing.didLike,
        });
        console.log("here's if you liked the story");
        console.log(thing.didLike);
      });
    }
    else{
      console.log("not logged in");
    }
  }

  componentDidUpdate() {
    if (this.props.userId){
      get("/api/isLiked", {
        story_id: this.props.story_id,
        page_num: this.props.card.page_num,
      }).then((thing) => {
        if (this.state.liked !== thing.didLike) {
          this.setState({
            liked: thing.didLike,
          });
        }
        console.log("here's if you liked the story");
        console.log(thing.didLike);
      });
    }
    else {
      if (this.state.liked) {
        this.setState({
          liked: false,
        });
      }
    }
  }

  render() {
    if (this.props.card.done) {
      return (
        <div className="StoryCard-container">
            <span className="Title">{this.props.card.cardTitle}</span>
            <span className="Author"> by {this.props.card.creator_name}</span>
            <hr/>
            <div className="CardContent"> {this.props.card.content} </div>
            <button className={this.state.liked ? "Button Button-liked": "Button Button-unliked"}
             onClick={this.handleSubmit}>
                Like
            </button>
            <span> {this.state.numLikes} </span>
        </div>
      );
    }
    else {
      return (
        <div className="StoryCard-container">
            <span className="Title"> No Story Card here yet! </span>
            <hr/>
            <div> No content here yet! </div>
        </div>
      );
    }
  }
}

export default StoryCard;
