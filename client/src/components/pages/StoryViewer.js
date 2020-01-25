import React, { Component } from "react";
import StoryCard from "../modules/StoryCard.js";
import StoryCardIcon from "../modules/StoryCardIcon.js";
import StoryTreeNode from "../modules/StoryTreeNode.js";
import CardInput from "../modules/CardInput.js";

import { get } from "../../utilities";
import "./StoryViewer.css";

/**
 * Story Viewer for checking out stories
 * 
 * Props: from Browse or Profile
 * story_id: from Browse/Profile
 * userId: this is from App
 * start_page: from Browse/Profile
 * 
 * storyCard field reference:
 *  cardTitle:
 *  creator_name:
 *  creator_id:
 *  page_num:
 *  content:
 *  done:
 * 
 * State: To store where we're at
 * story: the current story
 * page_num: self explanatory
 * page_code: ie UUR
 * 
 * CAREFUL: the "done" prop might be outdated, so "done" state takes precedence
 */
class StoryViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        story: undefined,
        page_num: 0,
        page_code: "",
    };
  }

  // exact copy of componentDidMount, but with no page jumping
  updateCard = (card) => {
    get("/api/storyById", {story_id: this.props.story_id}).then((foundStory) => {
        this.setState({
            story: foundStory,
        });
    });
  };

  handleSubmit = (event) => {
    // clicking tree nodes
    if (Number(event.target.getAttribute("type")) >= 0 && Number(event.target.getAttribute("type")) <= 40) {
        this.setState({
            page_num: Number(event.target.getAttribute("type")),
        });
    }

    // clicking story icons
    let leftSibling;
    let rightSibling;
    if (Number(this.state.page_num) % 3 === 0) {
        leftSibling = Number(this.state.page_num) - 1;
        rightSibling = Number(this.state.page_num) - 2;
    } else if (Number(this.state.page_num) % 3 === 1) {
        leftSibling = Number(this.state.page_num) + 2;
        rightSibling = Number(this.state.page_num) + 1;
    } else {
        leftSibling = Number(this.state.page_num) - 1;
        rightSibling = Number(this.state.page_num) + 1;
    }

    if (event.target.getAttribute("type") === "parent") {
        if (Number(this.state.page_num) > 0) {
            this.setState({
                page_num: Math.floor((Number(this.state.page_num) - 1)/ 3),
            });
        }
    } else if (event.target.getAttribute("type") === "leftSibling") {
        if (Number(this.state.page_num) > 0) {
            this.setState({
                page_num: leftSibling,
            });
        }
    } else if (event.target.getAttribute("type") === "rightSibling") {
        if (Number(this.state.page_num) > 0) {
            this.setState({
                page_num: rightSibling,
            });
        }
    } else if (event.target.getAttribute("type") === "leftChild") {
        if (Number(this.state.page_num) <= 12) {
            this.setState({
                page_num: Number(this.state.page_num) * 3 + 1,
            });
        }
    } else if (event.target.getAttribute("type") === "midChild") {
        if (Number(this.state.page_num) <= 12) {
            this.setState({
                page_num: Number(this.state.page_num) * 3 + 2,
            });
        }
    } else if (event.target.getAttribute("type") === "rightChild") {
        if (Number(this.state.page_num) <= 12) {
            this.setState({
                page_num: Number(this.state.page_num) * 3 + 3,
            });
        }
    }
    
    if (event.target.getAttribute("type") === "B")
    {
        if (Number(this.state.page_num) > 0) {
            this.setState({
                page_num: Math.floor((Number(this.state.page_num) - 1)/ 3),
                page_code: this.state.page_code.substring(0, this.state.page_code.length - 1),
            });
        }
    }
    else if (event.target.getAttribute("type") === "U")
    {
        if (this.state.page_code.length < 3) {
            this.setState({
                page_num: Number(this.state.page_num) * 3 + 1,
                page_code: this.state.page_code + "U",
            });
        }
    }
    else if (event.target.getAttribute("type") === "R")
    {
        if (this.state.page_code.length < 3) {
            this.setState({
                page_num: Number(this.state.page_num) * 3 + 2,
                page_code: this.state.page_code + "R",
            });
        }
    }
    else if (event.target.getAttribute("type") === "D")
    {
        if (this.state.page_code.length < 3) {
            this.setState({
                page_num: Number(this.state.page_num) * 3 + 3,
                page_code: this.state.page_code + "D",
            });
        }
    }
  };

  //we will need a function to refresh the storyviewer page when a new story is added
  componentDidMount() {
    get("/api/storyById", {story_id: this.props.story_id}).then((foundStory) => {
        let code = "";
        let num  = this.props.start_page;
        while (num > 0) {
            if (num % 3 === 1) {
                code += "U";
            }
            else if (num % 3 === 2) {
                code += "R";
            }
            else if (num % 3 === 0){
                code += "D";
            }
            num = Math.floor((num - 1) / 3);
        }
        code = code.split('').reverse().join('');
        this.setState({
            story: foundStory,
            page_num: this.props.start_page,
            page_code: code,
        });
    });
  }

  render() {
        if (!this.state.story){
            return (
                <div>
                    <h1>This is the Story Viewer Page!</h1>
                    <div>Fetching Story...</div>
                </div>
            );
        }

        const curCard = this.state.story.pages[Number(this.state.page_num)];
        const parentCard = this.state.story.pages[Math.floor((Number(this.state.page_num) - 1) / 3)];
        let leftSiblingCard = undefined;
        let rightSiblingCard = undefined;
        let leftChildCard = undefined;
        let midChildCard = undefined;
        let rightChildCard = undefined;
        if (Number(this.state.page_num) % 3 === 0) {
            leftSiblingCard = this.state.story.pages[Number(this.state.page_num) - 1];
            rightSiblingCard = this.state.story.pages[Number(this.state.page_num) - 2];
        } else if (Number(this.state.page_num) % 3 === 1) {
            leftSiblingCard = this.state.story.pages[Number(this.state.page_num) + 2];
            rightSiblingCard = this.state.story.pages[Number(this.state.page_num) + 1];
        } else {
            leftSiblingCard = this.state.story.pages[Number(this.state.page_num) - 1];
            rightSiblingCard = this.state.story.pages[Number(this.state.page_num) + 1];
        }
        if (Number(this.state.page_num) < 13) {
            leftChildCard = this.state.story.pages[Number(this.state.page_num) * 3 + 1];
            midChildCard = this.state.story.pages[Number(this.state.page_num) * 3 + 2];
            rightChildCard = this.state.story.pages[Number(this.state.page_num) * 3 + 3];
        }

        let curReturn;
        if (curCard.done) {
            curReturn = (<StoryCard key={curCard._id} card={curCard} story_id = {this.props.story_id} userId = {this.props.userId}/>);
        }
        else {
            curReturn = (<CardInput updateCard = {this.updateCard} story_id = {this.props.story_id} page_num = {Number(this.state.page_num)} page_code = {this.state.page_code}/>);
        }

        // building StoryTreeNavigator
        let StoryTreeNavigator = [];
        let i;
        for (i = 0; i < 40; i++) {
            if (i === Number(this.state.page_num)) {
                StoryTreeNavigator.push([<StoryTreeNode current={true} card={this.state.story.pages[i]} type={i} handleSubmit={this.handleSubmit}/>]);
            } else {
                StoryTreeNavigator.push([<StoryTreeNode card={this.state.story.pages[i]} type={i} handleSubmit={this.handleSubmit}/>]);
            }
        }

        //if (curCard.done) {
            if (Number(this.state.page_num) === 0) {
            // root node
                return (
                    <div className = "flex-center">
                        <div>
                            <div className = "treeRow">{StoryTreeNavigator[0]}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(1,4)}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(4,13)}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(13,40)}</div>
                        </div>
                        <div>
                            <div className = "flex-center">
                                {curReturn}
                            </div>
                            <div className = "flex-center">
                                    {<StoryCardIcon card={leftChildCard} type="leftChild" handleSubmit={this.handleSubmit}/>}
                                    {<StoryCardIcon card={midChildCard} type="midChild" handleSubmit={this.handleSubmit}/>}
                                    {<StoryCardIcon card={rightChildCard} type="rightChild" handleSubmit={this.handleSubmit}/>}
                            </div>
                        </div>
                    </div>
                );
            } 
            else if (Number(this.state.page_num) > 12) {
            // leaf node
                return (
                    <div className = "flex-center">
                        <div>
                            <div className = "treeRow">{StoryTreeNavigator[0]}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(1,4)}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(4,13)}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(13,40)}</div>
                        </div>
                        <div>
                            <div className = "flex-center">
                                {<StoryCardIcon card={parentCard} type="parent" handleSubmit={this.handleSubmit}/>}
                            </div>
                            <div className = "flex-center">
                                {<StoryCardIcon card={leftSiblingCard} type="leftSibling" handleSubmit={this.handleSubmit}/>}
                                {curReturn}
                                <StoryCardIcon card={rightSiblingCard} type="rightSibling" handleSubmit={this.handleSubmit}/>
                            </div>
                        </div>
                    </div>
                );
            } 
            else {
                return (
                    <div className = "flex-center">
                        <div>
                            <div className = "treeRow">{StoryTreeNavigator[0]}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(1,4)}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(4,13)}</div>
                            <div className = "treeRow">{StoryTreeNavigator.slice(13,40)}</div>
                        </div>
                        <div>
                            <div className = "flex-center">
                                {<StoryCardIcon card={parentCard} type="parent" handleSubmit={this.handleSubmit}/>}
                            </div>
                            <div className = "flex-center">
                                {<StoryCardIcon card={leftSiblingCard} type="leftSibling" handleSubmit={this.handleSubmit}/>}
                                {curReturn}
                                {<StoryCardIcon card={rightSiblingCard} type="rightSibling" handleSubmit={this.handleSubmit}/>}
                            </div>
                            <div className = "flex-center">
                                {<StoryCardIcon card={leftChildCard} type="leftChild" handleSubmit={this.handleSubmit}/>}
                                {<StoryCardIcon card={midChildCard} type="midChild" handleSubmit={this.handleSubmit}/>}
                                {<StoryCardIcon card={rightChildCard} type="rightChild" handleSubmit={this.handleSubmit}/>}
                            </div>
                        </div>
                    </div>
                );
            }
        /*}
        else {
            return (
                <div>
                    <h1> This is the Story Viewer Page!</h1>
                    <CardInput updateCard = {this.updateCard} story_id = {this.props.story_id} page_num = {Number(this.state.page_num)} page_code = {this.state.page_code}/>
                    <button onClick={this.handleSubmit} type="B">
                    Back
                    </button>
                    <button onClick={this.handleSubmit} type="U">
                    Up
                    </button>
                    <button onClick={this.handleSubmit} type="R">
                    Right
                    </button>
                    <button onClick={this.handleSubmit} type="D">
                    Down
                    </button>
                </div>
            );
        }*/
    }
}

export default StoryViewer;
