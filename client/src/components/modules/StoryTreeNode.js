import React, { Component } from "react";

import "./StoryTreeNode.css";

/**
 * Node for navigation tree
 * 
 * Props: from StoryViewer
 * card: at minimum must have StoryCard
 *      cardTitle: 
 *      creator_id:
 *      creator_name: 
 *      page_num:
 *      content:
 *      done: if card is filled out or nah
 * current: if currently on this card
 */
class StoryTreeNode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.current) {
      return (
        <div className="CurrentNode" type={this.props.type} onClick={this.props.handleSubmit}>
        </div>
      );
    } else if (this.props.card.done) {
      return (
        <div className="StoryTreeNode" type={this.props.type} onClick={this.props.handleSubmit}>
        </div>
      );
    }
    else {
      return (
        <div className="BlankNode" type={this.props.type} onClick={this.props.handleSubmit}>
        </div>
      );
    }
  }
}

export default StoryTreeNode;