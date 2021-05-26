const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: false }
});
module.exports = Post = mongoose.model('post', postSchema);
