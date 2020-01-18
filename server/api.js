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

// TODO: Delete this later, used only for testing purposes
router.post("/storycustom", auth.ensureLoggedIn, (req, res) => {
  let storyPages = [];
  for (i = 0; i < 41; i++)
  {
    storyPages = storyPages.concat([{
      cardTitle: "Title " + i.toString(),
      creator_id: "32498",
      creator_name: "Stanley Wang",
      page_num: i,
      content: "Content on page " + i.toString(),
      done: true,
    }]);
  }
  storyPages[0] = {
      cardTitle: "C&P: Prologue",
      creator_id: "543698",
      creator_name: "Fyodor Dostoevsky",
      page_num: 0,
      content: "ON AN EXCEPTIONALLY HOT evening early in July a young man came out of the tiny room which he rented from tenants in S. Place and walked slowly, as though in hesitation, towards K. Bridge.",
      done: true,
  };
  const newStoryObj = new StoryObj({
    storyTitle: req.body.storyTitle,
    author: req.user.name,
    author_id: req.user._id,
    pages: storyPages,
  });
  newStoryObj.save().then((storyObj) => res.send(storyObj))
});

router.get("/stories", (req, res) =>{
  // const users = await User.find({});
  // res.send(users);
  StoryObj.find({}).then((stories) => res.send(stories));
});

//req must specify story's id, page number, and have new title, new content
router.post("/card", auth.ensureLoggedIn, (req, res) => {
  StoryObj.findOne({storyTitle: "Story with Pages"}).then((story) => {
    story.pages[0] = {
      cardTitle: req.body.cardTitle,
      creator_name: req.user.name,
      creator_id: req.user._id,
      page_num: 0,
      content: req.body.content,
      done: true,
    };
    console.log(story);
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
