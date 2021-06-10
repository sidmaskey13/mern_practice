const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: schema.Types.ObjectId, ref: 'category' },
    tags: [{ type: String, required: false }],
    is_active: { type: String, required: true, default: false },
    createdAt: { type: Date, default: Date.now, required: false }
});
module.exports = Post = mongoose.model('post', postSchema);
