const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {type: String, required: True},
    content: {type: String, required: True},
    author: {type: String, required: True},
    publishDate: {type: Date, default: Date.now},
    tag: [String]
});
mondule.exports = mongoose.model('Article', articleSchema);
