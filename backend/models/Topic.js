const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    name: {type: String, required: true},
    numberOfArticles: {type: Number, default: 0}
});
module.exports = mongoose.model('Topic', topicSchema);