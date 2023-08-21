const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: String,
	body: String,
	device: String,
	no_of_comments: Number,
	user:String,
});

const postModel = mongoose.model("post", postSchema);
module.exports = { postModel };
