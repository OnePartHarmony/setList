const mongoose = require("../utility/connection")

const {Schema, model} = mongoose


const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [String],
    img: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})    
    
    
const Group = model("Group", groupSchema)

module.exports = Group