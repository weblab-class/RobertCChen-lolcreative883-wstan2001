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
  for (i = 0; i < 41; i++)
  {
    storyPages = storyPages.concat([{
      cardTitle: undefined,
      creator_id: undefined,
      creator_name: undefined,
      page_num: i,
      content: undefined,
      done: false,
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
  console.log("Asking for stories edited by user " + req.query.userId);
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
    };
    story.save().then((s) => res.send(s));
  });
  //StoryObj.updateOne({storyTitle: "Story with Pages"}, {$set: {"pages.0.cardTitle": req.body.cardTitle}}).then((s) => res.send(s));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
