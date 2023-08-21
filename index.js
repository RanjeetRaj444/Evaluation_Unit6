const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRouter } = require("./routes/user.Routes");
const { postRouter } = require("./routes/post.Routes");
const { authRouter } = require("./routes/auth.Routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.listen(process.env.PORT,async () => {
	try {
	mongoose.connect(process.env.MONGO_URL);
	console.log("hello")
	console.log(`App is listening on port ${process.env.PORT}`);
	} catch (err) {
	console.log({ msg: err.message });
	}
});
