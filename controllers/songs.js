////dependencies////
const express = require("express")
const Song = require("../models/songs")

/////router////
const router = express.Router()

////////////ROUTES//////

/////////GET route to INDEX songs by group////////
router.get("/", (req,res) => {
    const session = req.session
    Song.find({owner: session.groupId})
        .then(songs => {
            res.render("songs/index", {songs, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////////GET route to render NEW song form///////////
router.get("/new", (req,res) => {
    const session = req.session
    res.render("songs/new", {session})
})

////////POST route to CREATE new song////////////
router.post("/", (req,res) => {
    req.body.owner = req.session.groupId
    ///change keywords input by user into an array///////
    // let keywordString = req.body.keywords
    // let keywordArray = keywordString.split(",")
    // let spacelessArray = keywordArray.map(word => { return word.trim() })
    // req.body.keywords = spacelessArray
    ////change inputs from checkboxes into booleans//////
    req.body.sharp = req.body.sharp === "on" ? true : false
    req.body.flat = req.body.flat === "on" ? true : false
    req.body.minor = req.body.minor === "on" ? true : false
    Song.create(req.body)
        .then(song => {
            res.redirect("/songs")
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

////////GET route to SHOW song///////////
router.get("/:songId", (req,res) => {
    const songId = req.params.songId
    const session = req.session
    Song.findById(songId)
        .populate("notes.author", "username")
        .then(song => {
            res.render("songs/show", {song, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////GET route to render EDIT song form////////////
router.get("/edit/:songId", (req,res) => {
    const songId = req.params.songId
    const session = req.session
    Song.findById(songId)
        .then(song => {
            res.render("songs/edit", {song, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

///////PUT route to UPDATE song///////////////
router.put("/:songId", (req,res) => {
    const songId = req.params.songId
    ///change keywords input by user into an array///////
    // let keywordString = req.body.keywords
    // let keywordArray = keywordString.split(",")
    // let spacelessArray = keywordArray.map(word => { return word.trim() })
    // req.body.keywords = spacelessArray
    ////change inputs from checkboxes into booleans//////
    req.body.sharp = req.body.sharp === "on" ? true : false
    req.body.flat = req.body.flat === "on" ? true : false
    req.body.minor = req.body.minor === "on" ? true : false
    Song.findById(songId)
        .then(song => {
            if (song.owner == req.session.groupId) {
                return song.updateOne(req.body)
            } else {
                res.redirect(`/error?error=song%20may%20only%20be%20updated%20by%20members%20of%20group`)
            }
        })
        .then(()=>{
            res.redirect(`/songs/${songId}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

////////GET route to render delete song page////////////
router.get("/delete/:songId", (req,res) => {
    const songId = req.params.songId
    const session = req.session
    Song.findById(songId)
        .then(song => {
            res.render("songs/delete", {song, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

///////////DELETE route to delete song////////////
router.delete("/:songId", (req,res) => {
    const songId = req.params.songId
    Song.findById(songId)
        .then(song => {
            if (song.owner == req.session.groupId) {
                song.deleteOne()
                res.redirect("/songs")
            } else {
                res.redirect(`/error?error=only%20group%20members%20may%20delete%20songs`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

////Export Router///////
module.exports = router
