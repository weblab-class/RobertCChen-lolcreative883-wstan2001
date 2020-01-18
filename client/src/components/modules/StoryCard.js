import React, { Component } from "react";

import "./StoryCard.css";

/**
 * Story Card to display stories
 * 
 * Props: from StoryViewer
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
  }

  render() {
    if (this.props.card.done) {
      return (
        <div className="StoryCard-container">
            <span className="Title">{this.props.card.cardTitle}</span>
            <span className="Author"> by {this.props.card.creator_name}</span>
            <hr/>
            <div> {this.props.card.content} </div>
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
    /*(this.props.card.content === undefined) ? return(
        <div/>
    ); : return (
        <div>
            <div className="StoryCard-container">
                <h1>{this.props.cardTitle}</h1>
                <div> {ret} </div>
            </div>
        </div>
    );*/
  }
}

export default StoryCard;