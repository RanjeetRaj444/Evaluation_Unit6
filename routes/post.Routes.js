const express = require("express");

const postRouter = express.Router();

const {
	createPost,
	getUserPosts,
	getTopPosts,
	updatePost,
	deletePost,
} = require("../controllers/postController");
const { auth } = require("../middleware/authMiddleware");

postRouter.use(auth);
postRouter.get("/", getUserPosts);
postRouter.get("/add", createPost);
postRouter.get("/top", getTopPosts);
postRouter.post("/update/:postId", updatePost);
postRouter.post("/delete", deletePost);

module.exports = { postRouter };
