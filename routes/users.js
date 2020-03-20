const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @route    POST api/user
// @desc     Register a user
// @access   Public
router.post(
	'/',
	[
		check('name', 'name is required').isLength({ min: 5 }),
		check('email', 'Please provide a valid email').isEmail(),
		check('password', 'please enter a password with 6 or more chars').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'user aldready exists' });
			}
			user = new User({
				name,
				email,
				password
			});
			// hash the user password with the salt
			const salt = await bcrypt.genSalt(10);
			user.passowrd = await bcrypt.hash(password, salt);

			// save to db
			await user.save();

			// generate web token with expiration
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 36000
				},
				(err, token) => {
					//the statements after throw won't be executed
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (e) {
			console.log(e.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
