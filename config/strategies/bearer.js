var BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = new BearerStrategy(function(token, done) {
	var User = require('../../models/user.js');
	
	User.findOne({ token: token }, function(err, doc) {
		var user = doc;
		console.log(user);
		if(!user) {
			return done(null, null);
		}

		var jwt = require('jsonwebtoken');

		jwt.verify(user.token, "token-secret", function(err, decoded) {
			if(err) {
				console.log(err);
				return done(err, null);
			}
			return done(null, user);
		});

	});
});