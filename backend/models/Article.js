const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    publishDate: {type: Date, default: Date.now},
    tag: [String]
});
module.exports = mongoose.model('Article', articleSchema);
