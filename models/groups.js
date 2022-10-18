const mongoose = require("../utility/connection")

const {Schema, model} = mongoose


const groupSchema = new Schema({ //Names of schemas should be uppercase!
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: String,
        required: true
    }],
    img: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})    
    
    
const Group = model("Group", groupSchema)

module.exports = Group
