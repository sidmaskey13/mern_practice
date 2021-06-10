const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    title: { type: String, required: true },
    is_active: { type: String, required: true, default: false },
    createdAt: { type: Date, default: Date.now, required: false }
});
module.exports = Category = mongoose.model('category', categorySchema);
