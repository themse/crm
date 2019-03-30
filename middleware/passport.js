const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const credentials = require('../config/credentials');

const User = mongoose.model('user');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: credentials.JWT,
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await new User.findById(payload.userId).select('email id');
                user ? done(null) : done(null, false);
            } catch (error) {
                console.log(error);
            }
        })
    );
};