const User = require('../../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const deleteUser = async (req, res) => {
	try {
		const { username, password } = req.body;
	
		const user = await User.findOne({ username: username });
		if (!user) {
			return res.status(400).json({
				message: "User not found"
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "Invalid username or password"
			});
		}

		await User.deleteOne({ username: username });

		return res.status(200).json({
			message: "Account deleted successfully"
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Please try again later"
		});
	}
};

module.exports = deleteUser;
