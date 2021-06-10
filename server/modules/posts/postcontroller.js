const httpStatus = require('http-status');
const postSchema = require('./postschema')
const otherHelper = require('../../helper/other.helper');

const postController = {};

postController.get = async (req, res, next) => {
    try {
        let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
        sortQuery = { createdAt: -1 }
        populate = [{ path: 'category', select: 'title' }]
        let post = await otherHelper.getQuerySendResponse(postSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
        return otherHelper.paginationSendResponse(res, httpStatus.OK, true, post.data, 'All Post Retrieved', page, size, post.totalData);
    } catch (error) {
        next(error);
    }
};

postController.getIsActive = async (req, res, next) => {
    try {
        let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
        searchQuery = { is_active: true }
        sortQuery = { createdAt: -1 }
        populate = [{ path: 'category', select: 'title' }]
        let post = await otherHelper.getQuerySendResponse(postSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
        return otherHelper.paginationSendResponse(res, httpStatus.OK, true, post.data, 'All Post Retrieved', page, size, post.totalData);
    } catch (error) {
        next(error);
    }
};

postController.save = async (req, res, next) => {
    try {
        const post = req.body;
        if (post && post._id) {
            const update = await postSchema.findByIdAndUpdate(post._id, { $set: post }, { new: true });
            return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Post Added', null);
        }
        else {
            const new_post = new postSchema(post);
            const new_post_save = await new_post.save();
            return otherHelper.sendResponse(res, httpStatus.OK, true, new_post_save, null, 'Post Updated', null);
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
        return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Post Deleted', null);
    }
    catch (err) {
        next(err);
    }
}

postController.single = async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await postSchema.findById(id)
        return otherHelper.sendResponse(res, httpStatus.OK, true, post, null, 'Post Single Retrieved', null);
    }
    catch (err) {
        next(err);
    }
}

module.exports = postController;
