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
    /////turn string of member emails into array of separate emails////////
    let memberString = req.body.members
    let memberArray = memberString.split(",")
    let spacelessArray = memberArray.map(word => { return word.trim() })
    /////////add user email to members in case user forgot themself/////////
    spacelessArray.push(req.session.email)
    /////////////remove duplicate emails//////////////
    let uniqueArray = [...new Set(spacelessArray)]
    req.body.members = uniqueArray
    Group.create(req.body)
        .then(group => {
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
                        if (user) {
                          memberArray.push(user.username)  
                        }                        
                    })
                    .catch(err => res.redirect(`/error?error=${err}`))
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
                    res.redirect("/songs")
                } else {
                    res.redirect(`/error?error=members%20of%20${group.name}%20only`)
                }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

//////////GET route to render edit group form////////////
router.get("/edit/:groupId", (req,res) => {
    const groupId = req.params.groupId
    const session = req.session
    Group.findById(groupId)
        .then(group => {
            res.render("groups/edit", {group, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

///////PUT route to update group///////////////
router.put("/:groupId", (req,res) => {
    const groupId = req.params.groupId
    /////turn string of member emails into array of separate emails////////
    let memberString = req.body.members
    let memberArray = memberString.split(",")    
    let spacelessArray = memberArray.map(word => { return word.trim() })
    /////////add user email to members in case user forgot themself/////////
    spacelessArray.push(req.session.email)    
    /////////////remove duplicate emails//////////////
    let uniqueArray = [...new Set(spacelessArray)]
    req.body.members = uniqueArray
    Group.findById(groupId)
        .then(group => {
            if (group.members.includes(req.session.email)) {
            ////update session info if user is working as updated group/////
                if (req.session.groupId == groupId){
                    req.session.members = uniqueArray
                    req.session.groupName = req.body.name
                    req.session.groupImg = req.body.img
                    req.session.save()
                }
                return group.updateOne(req.body)
            } else {
                res.redirect(`/error?error=group%20may%20only%20be%20edited%20by%20members`)
            }
        })
        .then(()=>{
            res.redirect(`/groups/${groupId}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))

})

////////GET route to render delete group page////////////
router.get("/delete/:groupId", (req,res) => {
    const groupId = req.params.groupId
    const session = req.session
    Group.findById(groupId)
    .then(group => {
        res.render("groups/delete", {group, session})
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

///////////DELETE route to delete group////////////
router.delete("/:groupId", (req,res) => {
    const groupId = req.params.groupId
    Group.findById(groupId)
        .then(group => {
            if (group.owner == req.session.userId) {
                group.deleteOne()
                res.redirect("/groups")
            } else {
                res.redirect(`/error?error=only%20group%20creator%20may%20delete%20group`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})



////export router//////
module.exports = router
