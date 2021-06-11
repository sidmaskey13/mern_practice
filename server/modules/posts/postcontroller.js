const httpStatus = require('http-status');
const postSchema = require('./postschema')
const otherHelper = require('../../helper/other.helper');

const postController = {};

postController.getAll = async (req, res, next) => {
    try {
        let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req);
        sortQuery = { createdAt: -1 }
        populate = [{ path: 'category', select: 'title' }, { path: 'user', select: 'name' }]
        let post = await otherHelper.getQuerySendResponse(postSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
        return otherHelper.paginationSendResponse(res, httpStatus.OK, true, post.data, 'All Post Retrieved', page, size, post.totalData);
    } catch (error) {
        next(error);
    }
};

postController.getOwn = async (req, res, next) => {
    try {
        let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req);
        const user_id = req.user.user._id
        searchQuery = { user: user_id }
        sortQuery = { createdAt: -1 }

        populate = [{ path: 'category', select: 'title' }, { path: 'user', select: 'name' }]
        let post = await otherHelper.getQuerySendResponse(postSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
        return otherHelper.paginationSendResponse(res, httpStatus.OK, true, post.data, 'All Post Retrieved', page, size, post.totalData);
    } catch (error) {
        next(error);
    }
};

postController.getIsActive = async (req, res, next) => {
    try {
        let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req);
        searchQuery = { is_active: true }
        sortQuery = { createdAt: -1 }
        size = 5
        populate = [{ path: 'category', select: 'title' }, { path: 'user', select: 'name' }]
        let post = await otherHelper.getQuerySendResponse(postSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
        return otherHelper.paginationSendResponse(res, httpStatus.OK, true, post.data, 'All Post Retrieved', page, size, post.totalData);
    } catch (error) {
        next(error);
    }
};

postController.save = async (req, res, next) => {
    try {
        let post = req.body;
        const user_id = req.user.user._id
        if (post && post._id) {
            const update = await postSchema.findByIdAndUpdate(post._id, { $set: post }, { new: true })
                .then(t => t.populate('category', 'title').execPopulate())
                .then(t => t.populate('user', 'name').execPopulate());
            return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Post Added', null);
        }
        else {
            post.user = user_id
            const new_post = new postSchema(post);
            const new_post_save = await new_post.save()
                .then(t => t.populate('category', 'title').execPopulate())
                .then(t => t.populate('user', 'name').execPopulate());
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
