const adminModel = require("../models/admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const admin = require("../models/admin");

const secret = process.env.SECRET_KEY;

const options = {};
const extract = passportJWT.ExtractJwt;
options.secretOrKey = secret;
options.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderWithScheme("jwt");

exports.createAdmin = function (req, res, next) {
	const name = req.body.name.toString().trim();
	const email = req.body.email.toString().trim();
	const password = req.body.password.toString().trim();

	const admin = new adminModel({
		name,
		email,
		password,
	});

	const hashedAdmin = (admin, fn) => {
		bcryptjs.genSalt(20, (e, salt) => {
			bcryptjs.hash(admin.password, salt, (e, hash) => {
				const a = admin;
				a.password = hash;
				a.save(fn);
			});
		});
	};

	hashedAdmin(admin, (e, user) => {
		if (e) {
			return next(err);
		}
		res.json({ createAdmin: "success" });
	});
};

exports.validateAdmin = function (req, res, next) {
	const getByEmail = (email, fn) => {
		adminModel.findOne({ email: email }, fn);
	};

	const compare = (pw, hash, fn) => {
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

		getByEmail(email, (e, admin) => {
			if (!admin) {
				res.status(404).json({ message: "Account does not exists" });
			} else {
				compare(pw, admin.password, (err, isMatch) => {
					if (err) {
						next(err);
					}
					if (isMatch) {
						const payload = { id: admin._id };
						const token = jwt.sign(payload, options.secretOrKey, {
							expiresIn: "4h",
						});
						res.json({
							id: admin._id,
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
