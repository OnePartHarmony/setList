const mongoose = require("../utility/connection")

const {Schema} = mongoose

const noteSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: String
})


module.exports = noteSchema