const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    commentText: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);