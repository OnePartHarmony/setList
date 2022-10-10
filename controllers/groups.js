////dependencies////
const express = require("express")
const Group = require("../models/groups")

/////router////
const router = express.Router()

////////////ROUTES//////

//////GET route to show all groups user is in///////////
router.get("/", (req,res) => {
    Group.find({members: req.session.email})
        .then(groups => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            const email = req.session.email
            res.render("groups/index", {username, loggedIn, userId, email, groups})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////////GET route to render new group form///////////
router.get("/new", (req,res) => {

})

/////////POST route to create new group///////////////
router.post("/new", (req,res) => {
    
})

/////GET route to render show group page////////////
router.get("/:groupId", (req,res) => {
    
})

////////POST route to work as group///////////////
router.post("/:groupId", (req,res) => {
    
})

//////////GET route to render edit group form////////////
router.get("/edit/:groupId", (req,res) => {
    
})

///////PUT route to update group///////////////
router.put("/:groupId", (req,res) => {
    
})

////////GET route to render delete group page////////////
router.get("/delete/:groupId", (req,res) => {
    
})

///////////DELETE route to delete group////////////
router.delete("/:groupId", (req,res) => {
    
})



////export router//////
module.exports = router