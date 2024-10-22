const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    bio: {type: String, required: true},
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
});

module.exports = mongoose.model('Author', authorSchema);