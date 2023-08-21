const { postModel } = require("../models/Post");

const createPost = async (req, res) => {
	try {
		const { title, body, device, no_of_comments } = req.body;
		const user = req.user.userId;
		const newPost = new postModel({
			title,
			body,
			device,
			no_of_comments,
			user,
		});
		await newPost.save();
		res
			.status(200)
			.send({ msg: "Post has been created successfully.", post: newPost });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};

const getUserPosts = async (req, res) => {
	try {
		const user = req.user.userId;
		const post = await postModel.find({ user });
		res.status(200).send({ Posts: post });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};

const getTopPosts = async (req, res) => {
	try {
		const user = req.user.userId;
		const post = await postModel
			.find({ user })
			.sort("-no_of_comments")
			.limit(3);
		res.status(200).send({ Posts: post });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};
const updatePost = async (req, res) => {
	try {
		const postId = req.params.postId;
		const { title, body, device, no_of_comments } = req.body;
		const post = await postModel.findByIdAndUpdate(
			postId,
			{ title, body, device, no_of_comments },
			{ new: true },
		);
		res
			.status(200)
			.send({ msg: "Post updated successfully.", updatedPost: post });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};
const deletePost = async (req, res) => {
	try {
		const postId = req.params.postId;
		const post = await postModel.findByIdAndDelete(postId);
		res.status(200).send({ msg: "Post deleted successfully." });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};

module.exports = {
	createPost,
	getUserPosts,
	getTopPosts,
	updatePost,
	deletePost,
};
