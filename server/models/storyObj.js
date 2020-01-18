const mongoose = require("mongoose");

const StoryObjSchema = new mongoose.Schema({
    storyTitle: String,
    author: String,
    author_id: String,
    pages: Array,
});

module.exports = mongoose.model("storyObj", StoryObjSchema);