const {Schema, model, ObjectId} = require('mongoose')

const Post = new Schema({
    name: {type: String, required: true},
    created: {type: Date, default: Date.now()},
    content: {type: String, required: true},
    owner: [{type: ObjectId, ref: "User"}]
})

module.exports = model('Post', Post)