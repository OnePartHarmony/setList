const mongoose = require("../utility/connection")
const noteSchema = require("../schema/notes")

const {Schema, model} = mongoose

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    list: [String],
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },
    notes: [noteSchema]
})



const List = model("List", listSchema)

module.exports = List