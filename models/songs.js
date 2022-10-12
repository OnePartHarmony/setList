const mongoose = require("../utility/connection")
const noteSchema = require("../schema/notes")

const {Schema, model} = mongoose

/////function to capitalize words in title, in case user enters it in lowercase//////
const capitalizeValue = (string) => {
    const wordsArray = string.split(" ")
    const capitalString = wordsArray.map(word => {
        return word[0].toUpperCase() + word.substring(1)
    }).join(" ")
    return capitalString
}

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
        set: capitalizeValue
    },
    description: String,
    keywords: [String],
    soloist: String,
    minutes: {
        type: Number,
        required: true
    },
    seconds: {
        type: Number,
        required: true
    },
    key: String,
    sharp: Boolean,
    flat: Boolean,
    minor: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },
    notes: [noteSchema]
})    
    
    
const Song = model("Song", songSchema)

module.exports = Song