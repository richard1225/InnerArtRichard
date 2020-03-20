const express = require('express');
const router = express.Router();
const config = require('config');
const multer = require('multer');
const Art = require('../models/art');
const auth = require('../middleware/auth');
const uuidv4 = require('uuid');
const { check, validationResult } = require('express-validator');

const DIR = './client/public';

// file storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, uuidv4() + '-' + fileName);
	}
});
// user upload / filter
var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		var obj = JSON.parse(req.body.data);
		const { title, price, tag } = obj;
		if (!title || !price || !tag) {
			cb(null, false);
			return cb('missing credientials');
		}
		if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb('Only .png, .jpg and .jpeg format allowed!');
		}
	}
});

// @route    GET api/contacts
// @desc     Get all user's art piece
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const arts = await Art.find({ user: req.user.id }).sort({ date: -1 });
		res.json(arts);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server error');
	}
});

// @route    POST api/user
// @desc     Add new art item
// @access   Private
router.post('/', auth, upload.single('profileImg'), async (req, res, next) => {
	const url = req.protocol + '://' + req.get('host');
	var obj = await JSON.parse(req.body.data);
	const { title, price, tag } = obj;
	try {
		const newArt = new Art({
			title,
			price,
			tag,
			user: req.user.id,
			image: url + '/public/' + req.file.filename
		});
		const art = await newArt.save();
		res.json(art);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server error');
	}
});

// @route    PUT api/user
// @desc     Update art item
// @access   Private
router.put('/:id', auth, async (req, res) => {
	// image missing
	const { title, price, tag } = req.body;
	// Build contact object
	const artFields = {};
	if (title) artFields.title = title;
	if (price) artFields.price = price;
	if (tag) artFields.tag = tag;

	try {
		let art = await Art.findById(req.params.id);
		if (!art) return res.status(404).json({ msg: 'image not found' });

		// Make sure users owns the image
		if (art.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}
		art = await Art.findByIdAndUpdate(req.params.id, { $set: artFields }, { new: true });
		res.json(art);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route    Delete api/user
// @desc     Delete art item
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	res.send('Delete item');
});

module.exports = router;
