const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.findAll = async (request, response) => {
    try {
        const categories = await Category.find({
            user: request.user.id,
        });
        response.status(200).json(categories);
    }
    catch (error) {
        errorHandler(error);
    }
};

module.exports.findById = async (request, response) => {
    try {
        const category = await Category.findById(request.params.id);
        response.status(200).json(category);
    } catch (error) {
        errorHandler(error);
    }
};

module.exports.removeById = async (request, response) => {
    try {
        await Category.remove({ _id: request.params.id });
        await Position.remove({ category: request.params.id });
        response.status(200).json({
            message: 'Category was successful deleted!',
        });
    } catch (error) {
        errorHandler(error);
    }
};

module.exports.create = async (request, response) => {
    try {
        const category = new Category({
            name: request.body.name,
            imageSrc: request.body.imageSrc,
            user: request.user.id,
        });
        response.status(201).json(category);
    } catch (error) {
        errorHandler(error);
    }
};

module.exports.update = async (request, response) => {
    try {
        const category = Category.findOneAndUpdate(
            { _id: request.body.id },
            { $set: request.body },
            { new: true }
        );
        response.status(200).json(category);
    } catch (error) {
        errorHandler(error);
    }
};
