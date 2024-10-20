const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {type: String, required: True},
    bio: {type: String, required: True},
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
});

module.exports = mongoose.model('Author', authorSchema);