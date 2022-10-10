const mongoose = require("../utility/connection")

const {Schema} = mongoose

const noteSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})


module.exports = noteSchema