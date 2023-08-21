const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) res.status(400).send({ msg: "Access denied!" });

	try {
		const decode = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decode;
		next();
	} catch (err) {
		res.status(400).send({ msg: err.message });
	}
};

module.exports = { auth };
