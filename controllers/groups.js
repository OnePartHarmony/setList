////dependencies////
const express = require("express")
const Group = require("../models/groups")
const User = require("../models/users")

/////router////
const router = express.Router()

////////////ROUTES//////

//////GET route to show all groups user is in///////////
router.get("/", (req,res) => {
    const session = req.session
    Group.find({members: session.email})
        .then(groups => {
            res.render("groups/index", {groups, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////////GET route to render new group form///////////
router.get("/new", (req,res) => {
    const session = req.session
    res.render("groups/new", {session})
})

/////////POST route to CREATE new group///////////////
router.post("/", (req,res) => {
    req.body.owner = req.session.userId
    let memberString = req.body.members
    memberString = memberString.replace(" ", "")
    req.body.members = memberString.split(",")
    Group.create(req.body)
        .then(group => {
            console.log(group)
            res.redirect("/groups")
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////GET route to render SHOW group page////////////
router.get("/:groupId", (req,res) => {    
    const groupId = req.params.groupId
    const session = req.session
    Group.findById(groupId)
        .then(group => {
            let memberArray = []
            group.members.forEach(email => {
                User.findOne({emailAddress: {$eq: email}})
                    .then(user => {
                        memberArray.push(user.username)
                    })
                    .catch(err => console.log(err))
            })
            res.render("groups/show", {group, session, memberArray})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


/////////POST route to LOGIN as group////////////
router.post("/:groupId", (req,res) => {
    const groupId = req.params.groupId
    Group.findById(groupId)
        .then((group) => {
                if (group.members.includes(req.session.email)) {
                    req.session.groupName = group.name
                    req.session.groupId = groupId
                    req.session.groupImg = group.img
                    req.session.members = group.members
                    console.log("this is req.session: ", req.session)
                    res.redirect("/songs")
                } else {
                    res.redirect(`/error?error=members%20of%20${group.name}%20only`)
                }
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

//////////GET route to render edit group form////////////
// router.get("/edit/:groupId", (req,res) => {
//     const groupId = req.params.groupId
    // const session = req.session

// })

///////PUT route to update group///////////////
// router.put("/:groupId", (req,res) => {
//     const groupId = req.params.groupId

// })

////////GET route to render delete group page////////////
// router.get("/delete/:groupId", (req,res) => {
//     const groupId = req.params.groupId
    // const session = req.session
// })

///////////DELETE route to delete group////////////
// router.delete("/:groupId", (req,res) => {
//     const groupId = req.params.groupId

// })



////export router//////
module.exports = router