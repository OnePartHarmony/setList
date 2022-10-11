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
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const email = req.session.email
    res.render("groups/new", {username, loggedIn, userId, email})
})

/////////POST route to create new group///////////////
router.post("/new", (req,res) => {
    req.body.owner = req.session.userId
    Group.create(req.body)
        .then(group => {
            res.redirect("/groups")
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////GET route to render show group page////////////
router.get("/:groupId", (req,res) => {
    const groupId = req.params.groupId
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const email = req.session.email
    const currentGroup = req.session.groupId
    Group.findById(groupId)
        .then(group => {
            res.render("/groups/show", {group, username, loggedIn, userId, email, currentGroup})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

////////POST route to work as group///////////////
router.post("/:groupId", (req,res) => {
    const groupId = req.params.groupId    
    Group.findById(groupId)
        .then(group => {
            if (group.members.includes(req.session.email)) {
                req.session.groupId = groupId
                res.redirect("/songs")
            } else {
                res.redirect(`/error?error=not%20a%20member%20of%20${group.name}`)
            }
        })
        .catch(err => { res.redirect(`/error?error=${err}`)})
})

//////////GET route to render edit group form////////////
// router.get("/edit/:groupId", (req,res) => {
//     const groupId = req.params.groupId

// })

///////PUT route to update group///////////////
// router.put("/:groupId", (req,res) => {
//     const groupId = req.params.groupId

// })

////////GET route to render delete group page////////////
// router.get("/delete/:groupId", (req,res) => {
//     const groupId = req.params.groupId

// })

///////////DELETE route to delete group////////////
// router.delete("/:groupId", (req,res) => {
//     const groupId = req.params.groupId

// })



////export router//////
module.exports = router