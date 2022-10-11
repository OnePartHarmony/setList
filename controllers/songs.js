////dependencies////
const express = require("express")
const Song = require("../models/songs")

/////router////
const router = express.Router()

////////////ROUTES//////

/////////GET route to view all songs by group////////
// router.get("/", (req,res) => {

// })

/////////GET route to render new song form///////////
router.get("/new", (req,res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const email = req.session.email
    const currentGroup = req.session.groupId
    res.render("songs/new", {username, loggedIn, userId, email, currentGroup})
})

////////POST route to create new song////////////
// router.post("/new", (req,res) => {

// })

////////GET route to show song///////////
// router.get("/:songId", (req,res) => {
//     const songId = req.params.songId

// })

//////////GET route to render edit song form////////////
// router.get("/edit/:songId", (req,res) => {
//     const songId = req.params.songId

// })

///////PUT route to update song///////////////
// router.put("/:songId", (req,res) => {
//     const songId = req.params.songId

// })

////////GET route to render delete song page////////////
// router.get("/delete/:songId", (req,res) => {
//     const songId = req.params.songId

// })

///////////DELETE route to delete song////////////
// router.delete("/delete/:songId", (req,res) => {
//     const songId = req.params.songId

// })






module.exports = router