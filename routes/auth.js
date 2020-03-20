const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route    GET api/auth
// @desc     Get logged in user
// @access   private
router.get('/', auth, async (req, res) => {
	try {
		// find user in the db and ignore the password

		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    POST api/auth
// @desc     Auth user & get token
// @access   Public
router.post(
	'/',
	[ check('email', 'Please provide a valid email').isEmail(), check('password', 'password is required').exists() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: 'User does not exists' });
			}
			// validate user password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				res.status(400).json({ msg: 'Password incorrect' });
			}

			// generate web token with expiration
			const payload = {
				id: user.id
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
