const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
        
    },
    email: {
        required: true,
        type: String
        
    },
    password: {
        required: true,
        type: String
    },
    userId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Posts"
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User