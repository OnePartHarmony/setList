////dependencies////
const express = require("express")
const List = require("../models/lists")
const Song = require("../models/songs")

/////router////
const router = express.Router()

////////////ROUTES//////

/////GET route to INDEX lists by a group///////
router.get("/", (req,res) => {
    const session = req.session
    List.find({owner: session.groupId})
        .then(lists => {
            res.render("lists/index", {lists, session})
        })
        .catch(err => res.render(`/error?error=${err}`))
})

////////GET route to render NEW list form//////////
router.get("/new", (req,res) => {
    const session = req.session
    res.render("lists/new", {session})
})

////////POST route to CREATE new list///////////////
router.post("/", (req, res) => {
    req.body.owner = req.session.groupId
    List.create(req.body)
    .then(list => {
        console.log("new list: ", list)
        res.redirect("/lists")
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

///////////GET route to SHOW list/////////////////
router.get("/:listId", (req,res) => {
    const listId = req.params.listId
    const session = req.session
    const songs = []
    List.findById(listId)
        .then(list => {
            list.listContents.forEach(songId => {
                Song.findById(songId)
                    .then(song => {
                        songs.push(song)
                    })
                    .catch(err => res.redirect(`/error?error=${err}`)) 
            })
            res.render("lists/show", {list, session, songs})                 
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

////////////GET route to render EDIT list form///////////

///////////PUT route to UPDATE list/////////////

//////////GET route to render DELETE list form////////////

///////////////DELETE route to DELETE list////////////



////Export Router///////
module.exports = router