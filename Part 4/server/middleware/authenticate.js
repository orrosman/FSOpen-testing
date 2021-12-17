const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
	try {
		const token = req.headers['authorization'].split(' ')[1];

		const isValid = jwt.verify(token, process.env.JWT_SECRET);

		if (isValid) {
			res.status(200).send({
				valid: true,
			});
		} else {
			res.status(403).send({
				message: 'Invalid Access Token',
			});
		}
	} catch (err) {
		res.status(401).send({
			message: 'Access Token Required',
		});
	}
};
module.exports = authenticate;