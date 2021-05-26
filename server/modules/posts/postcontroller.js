const httpStatus = require('http-status');
const postSchema = require('./postschema')
const postController = {};

postController.get = async (req, res, next) => {
    try {
        const product = await postSchema.find().lean()
        res.send(product)
    } catch (error) {
        next(error);
    }
};

module.exports = postController;
