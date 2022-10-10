const mongoose = require("../utility/connection")

const {Schema, model} = mongoose

const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    emailAddress: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const User = model("User", userSchema)



module.exports = User