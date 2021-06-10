const httpStatus = require('http-status');
const categorySchema = require('./categorySchema')
const categoryController = {};

categoryController.get = async (req, res, next) => {
    try {
        const cat = await categorySchema.find().sort({ createdAt: -1 }).lean()
        res.send(cat)
    } catch (error) {
        next(error);
    }
};

categoryController.getIsActive = async (req, res, next) => {
    try {
        const cat = await categorySchema.find({ is_active: true }).sort({ createdAt: -1 }).lean()
        res.send(cat)
    } catch (error) {
        next(error);
    }
};

categoryController.save = async (req, res, next) => {
    try {
        const cat = req.body;
        if (cat && cat._id) {
            const update = await categorySchema.findByIdAndUpdate(cat._id, { $set: cat }, { new: true });
            res.send(update)
        }
        else {
            const new_post = new categorySchema(cat);
            const new_post_save = await new_post.save();
            res.send(new_post_save)
        }
    }
    catch (err) {
        next(err);
    }
}

categoryController.delete = async (req, res, next) => {
    try {
        const id = req.params.id
        const cat = await categorySchema.findByIdAndDelete(id)
        res.send('Data deleted')
    }
    catch (err) {
        next(err);
    }
}


module.exports = categoryController;
