////dependencies////
const express = require("express")
const List = require("../models/lists")

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

///////////GET route to SHOW list/////////////////

////////////GET route to render EDIT list form///////////

///////////PUT route to UPDATE list/////////////

//////////GET route to render DELETE list form////////////

///////////////DELETE route to DELETE list////////////



////Export Router///////
module.exports = router