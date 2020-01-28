/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const StoryObj = require("./models/storyObj");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/story", auth.ensureLoggedIn, (req, res) => {
  let storyPages = [];
  for (i = 0; i < 40; i++)
  {
    storyPages = storyPages.concat([{
      cardTitle: undefined,
      creator_id: undefined,
      creator_name: undefined,
      page_num: i,
      content: undefined,
      done: false,
      likes: undefined,
    }]);
  }
  const newStoryObj = new StoryObj({
    storyTitle: req.body.storyTitle,
    author: req.user.name,
    author_id: req.user._id,
    pages: storyPages,
  });
  newStoryObj.save().then((storyObj) => res.send(storyObj))
});

router.get("/storyById", (req, res) => {
  StoryObj.findOne({_id: req.query.story_id}).then((story) => res.send(story));
});

router.get("/storiesByUserId", (req, res) => {
  StoryObj.find({$or: [{"pages.creator_id": req.query.userId}, {author_id: req.query.userId}]}).then((stories) => res.send(stories));
});

router.get("/stories", (req, res) =>{
  // const users = await User.find({});
  // res.send(users);
  StoryObj.find({}).then((stories) => res.send(stories));
});

//req must specify story's id, page number, and have new title, new content
router.post("/card", auth.ensureLoggedIn, (req, res) => {
  StoryObj.findOne({_id: req.body.story_id}).then((story) => {
    story.pages[req.body.page_num] = {
      cardTitle: req.body.cardTitle,
      creator_name: req.user.name,
      creator_id: req.user._id,
      page_num: req.body.page_num,
      content: req.body.content,
      done: true,
      likes: [],
    };
    story.save().then((s) => res.send(s));
  });
});

//req must specify story's id, page number
router.post("/deleteCard", auth.ensureLoggedIn, (req, res) => {
  StoryObj.findOne({_id: req.body.story_id}).then((story) => {
    story.pages[req.body.page_num] = {
      cardTitle: undefined,
      creator_name: undefined,
      creator_id: undefined,
      page_num: req.body.page_num,
      content: undefined,
      done: false,
      likes: undefined,
    };
    story.save().then((s) => res.send(s));
  });
});

//takes in storyId
router.get("/creatorIdFromStoryId", (req, res) => {
  StoryObj.findOne({_id: req.query.story_id}).then((story) => {
    res.send(story);
  });
})

//req will specify story's id and page number
router.post("/like", auth.ensureLoggedIn, (req, res) => {
  StoryObj.findOne({_id: req.body.story_id}).then((story) => {
    story.pages[req.body.page_num] = {
      likes: story.pages[req.body.page_num].likes.concat([req.user._id]),
      cardTitle: story.pages[req.body.page_num].cardTitle,
      creator_name: story.pages[req.body.page_num].creator_name,
      creator_id: story.pages[req.body.page_num].creator_id,
      page_num: story.pages[req.body.page_num].page_num,
      content: story.pages[req.body.page_num].content,
      done: story.pages[req.body.page_num].done,
    };
    story.save().then((s) => res.send(s));
  });
});

//req will specify story's id and page number
router.post("/unlike", auth.ensureLoggedIn, (req, res) => {
  StoryObj.findOne({_id: req.body.story_id}).then((story) => {
    const index = story.pages[req.body.page_num].likes.findIndex((element) => element === req.user._id);
    story.pages[req.body.page_num].likes.splice(index, 1);
    story.pages[req.body.page_num] = {
      likes: story.pages[req.body.page_num].likes,
      cardTitle: story.pages[req.body.page_num].cardTitle,
      creator_name: story.pages[req.body.page_num].creator_name,
      creator_id: story.pages[req.body.page_num].creator_id,
      page_num: story.pages[req.body.page_num].page_num,
      content: story.pages[req.body.page_num].content,
      done: story.pages[req.body.page_num].done,
    };
    story.save().then((s) => res.send(s));
  });
});

//query specifies story's id and page number
router.get("/getLikes", (req, res) => {
  StoryObj.findOne({_id: req.query.story_id}).then((story) => {
    //have to send back an object!
    res.send({num: story.pages[req.query.page_num].likes.length});
  });
});

//query specifies story's id and page number
router.get("/isLiked", auth.ensureLoggedIn, (req, res) => {
  StoryObj.findOne({_id: req.query.story_id}).then((story) => {
    //have to send back an object!
    const liked = story.pages[req.query.page_num].likes.includes(req.user._id);
    res.send({didLike: liked});
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
