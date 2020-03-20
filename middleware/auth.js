const jwt = require('jsonwebtoken');
config = require('config');

module.exports = function(req, res, next) {
	// Get token from header

	const token = req.header('x-auth-token');

	// Check if not existed
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}
	try {
		// verify given token using a secret or a public key to get a decoded token
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		// move to next middleware ( continue execution )
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Invalid token' });
	}
};
