const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const credentials = require('../config/credentials');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/User');

module.exports.login = async (request, response) => {
    const candidate = await User.findOne({ email: request.body.email });
    if (!candidate) {
        return response.status(404).json({
            message: 'The user not found',
        });
    }

    const passwordResult = bcrypt.compareSync(request.body.password, candidate.password);
    if (!passwordResult) {
        return response.status(401).json({
            message: 'Incorrect password',
        });
    }

    const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
    }, credentials.JWT, { expiresIn: 60 * 60 });
    response.status(200).json({
        token: `Bearer ${token}`,
    });
};

module.exports.registry = async (request, response) => {
    const candidate = await User.findOne({ email: request.body.email });
    if (candidate) {
        response.status(409).json({
            message: 'The user has already existed!',
        });
    }

    const salt = bcrypt.genSaltSync(10);
    const password = request.body.password;

    const user = new User({
        email: request.body.email,
        password: bcrypt.hashSync(password, salt),
    });

    try {
        await user.save();
        response.status(201). json(user);
    } catch (error) {
        errorHandler(response, error);
    }
};
