const httpStatus = require('http-status');
const postSchema = require('./postschema')
const postController = {};

postController.get = async (req, res, next) => {
    try {
        const product = await postSchema.find().sort({ createdAt: -1 }).lean()
        res.send(product)
    } catch (error) {
        next(error);
    }
};

postController.save = async (req, res, next) => {
    try {
        const post = req.body;
        if (post && post._id) {
            const update = await postSchema.findByIdAndUpdate(post._id, { $set: post }, { new: true });
            res.send(update)
        }
        else {
            const new_post = new postSchema(post);
            const new_post_save = await new_post.save();
            res.send(new_post_save)
        }
    }
    catch (err) {
        next(err);
    }
}

postController.delete = async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await postSchema.findByIdAndDelete(id)
        res.send('Data deleted')
    }
    catch (err) {
        next(err);
    }
}

postController.single = async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await postSchema.findById(id)
        res.send({ data: post })
    }
    catch (err) {
        next(err);
    }
}

module.exports = postController;
