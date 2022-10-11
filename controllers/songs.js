////dependencies////
const express = require("express")
const Song = require("../models/songs")

/////router////
const router = express.Router()

////////////ROUTES//////

/////////GET route to view all songs by group////////
router.get("/", (req,res) => {
    const session = req.session
    Song.find({owner: session.groupId})
        .then(songs => {
            res.render("songs/index", {songs, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////////GET route to render new song form///////////
router.get("/new", (req,res) => {
    const session = req.session
    res.render("songs/new", {session})
})

////////POST route to create new song////////////
// router.post("/new", (req,res) => {

// })

////////GET route to show song///////////
    // router.get("/:songId", (req,res) => {
    // const songId = req.params.songId
    // const session = req.session


// })

//////////GET route to render edit song form////////////
// router.get("/edit/:songId", (req,res) => {
//     const songId = req.params.songId
// const session = req.session


// })

///////PUT route to update song///////////////
// router.put("/:songId", (req,res) => {
//     const songId = req.params.songId

// })

////////GET route to render delete song page////////////
// router.get("/delete/:songId", (req,res) => {
//     const songId = req.params.songId
// const session = req.session

// })

///////////DELETE route to delete song////////////
// router.delete("/delete/:songId", (req,res) => {
//     const songId = req.params.songId

// })






module.exports = router