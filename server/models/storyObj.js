const mongoose = require("mongoose");

const StoryObjSchema = new mongoose.Schema({
    storyTitle: String,
    author: String,
    author_id: String,
    pages: [{
        cardTitle: String,
        creator_name: String,
        creator_id: String,
        page_num: Number,
        content: String,
        done: Boolean,
    }],
});

module.exports = mongoose.model("storyObj", StoryObjSchema);