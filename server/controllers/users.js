const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const user = require("../models/users");

const userSecret = process.env.USER_SECRET;

const options = {};
const extract = passportJWT.ExtractJwt;
options.secretOrKey = userSecret;
options.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderWithScheme("jwt");

exports.createUser = function (req, res, next) {
	const name = req.body.name.toString().trim();
	const email = req.body.email.toString().trim();
	const password = req.body.password.toString();

	const u = new Users({
		name,
		email,
		password,
	});

	const hashedUser = (user, fn) => {
		bcryptjs.genSalt(20, (e, salt) => {
			bcryptjs.hash(user.password, salt, (e, hash) => {
				const u = user;
				u.password = hash;
				u.save(fn);
			});
		});
	};

	hashedUser(u, (e, user) => {
		if (e) {
			return next(err);
		}
		res.json({ createUser: "success" });
	});
};

exports.validateUser = function (req, res, next) {
	const getByEmail = (email, fn) => {
		user.findOne({ email: email }, fn);
	};

	const compare = (pw, hash, callback) => {
		bcryptjs.compare(pw, hash, (e, isMatch) => {
			if (e) {
				return next(e);
			}
			callback(null, isMatch);
		});
	};

	if (req.body.email && req.body.password) {
		const email = req.body.email;
		const pw = req.body.password;

		getByEmail(email, (e, user) => {
			if (!user) {
				res.status(404).json({ message: "Account does not exists" });
			} else {
				compare(pw, user.password, (err, isMatch) => {
					if (err) {
						next(err);
					}
					if (isMatch) {
						const payload = { id: user._id };
						const token = jwt.sign(payload, options.secretOrKey, {
							expiresIn: "4h",
						});
						res.json({
							id: user._id,
							token,
							signInStatus: "success",
						});
					} else {
						res.status(400).json({ message: "Wrong password!" });
					}
				});
			}
		});
	}
};
