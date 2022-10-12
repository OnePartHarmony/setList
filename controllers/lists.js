////dependencies////
const express = require("express")
const List = require("../models/lists")

/////router////
const router = express.Router()

////////////ROUTES//////

/////GET route to INDEX lists by a group///////
router.get("/", (req,res) => {
    
})

////////GET route to render NEW list form//////////

////////POST route to CREATE new list///////////////

///////////GET route to SHOW list/////////////////

////////////GET route to render EDIT list form///////////

///////////PUT route to UPDATE list/////////////

//////////GET route to render DELETE list form////////////

///////////////DELETE route to DELETE list////////////



////Export Router///////
module.exports = router