const mongoose = require("../utility/connection")
const noteSchema = require("../schema/notes")

const {Schema, model} = mongoose

const listSchema = new Schema({
    
})



const List = model("List", listSchema)

module.exports = List