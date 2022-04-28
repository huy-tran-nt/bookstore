const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Email is invalid",
		],
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("admin", adminSchema);
