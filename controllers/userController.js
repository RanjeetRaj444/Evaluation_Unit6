const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User");
require("dotenv").config();

const register = async (req, res) => {
	try {
		const { name, email, gender, password, age, city, is_married } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const existUser = await UserModel.findOne({ email });

		if (existUser)
			res.status(400).send({ msg: "User already exist, please login" });
		const newUser = new UserModel({
			name,
			email,
			gender,
			password: hashedPassword,
			age,
			city,
			is_married,
		});
		await newUser.save();
		res
			.status(200)
			.send({ msg: "User registered successfully.", newUser: newUser });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		if (!user) res.status(400).send({ msg: "User not found!" });

		const passwordCheck = await bcrypt.compare(password, user.password);
		if (!passwordCheck) {
			res.status(400).send({ msg: "Invalid credentials!" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
			expiresIn: "7d",
		});
		res.status(200).send({ token });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};

const logout = async (req, res) => {
	try {
		res.send({ msg: "Logout SuccessFull." });
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};

module.exports = { register, login, logout };
