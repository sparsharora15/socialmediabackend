const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    data : {
        required: true,
        type: String
    }
})
const postsSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    data: {
        type: String
    },
    picture: {
        type: String
    },
    comments: {
        type: [commentSchema],
        default: []

    },
    totalLikes: {
        type: Number,
        default:0
    },
})

const Posts = mongoose.model('Posts', postsSchema)
module.exports = Posts