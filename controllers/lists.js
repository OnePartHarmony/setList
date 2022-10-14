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
            res.redirect("/lists")
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

/////////GET route to SHOW list/////////////////
router.get("/:listId", (req,res) => {
    const listId = req.params.listId
    const session = req.session
    let songsArray = []
    List.findById(listId)
        .then(list => {
            list.listContents.forEach((songId, index) => {
                Song.findById(songId)
                    .then(song => {         
                        songsArray[index] = song
                    })
                    .catch(err => res.redirect(`/error?error=${err}`))
            })
            ////How do you make this wait for the forEach to resolve?/////
            return list
        })
        .then(list => res.render("lists/show", {list, session, songsArray}) )
        .catch(err => res.redirect(`/error?error=${err}`))
})


///////////////GET route to view SONGS to add to list list/////////////
router.get("/songs/:listId", (req,res) => {
    const listId = req.params.listId
    const session = req.session
    let newSongs = []
    let listSongs = []
    List.findById(listId)
        .then(list => {
            ///////////find songs already on list//////////
            list.listContents.forEach((songId, index) => {
                Song.findById(songId)
                    .then(song => {         
                        listSongs[index] = song
                    })
                    .catch(err => res.redirect(`/error?error=${err}`))
            })
            ///////find all songs by list's group, and add new ones to array////////
            Song.find({owner: {$eq: list.owner}})
                .then(songs => {
                    songs.forEach(song => {
                        if (!list.listContents.includes(song.id)){
                            newSongs.push(song)
                        }
                    })
                })
                .catch(err => res.redirect(`/error?error=${err}`))
            return list
        })
        .then(list => res.render("lists/addSongs", {list, session, newSongs, listSongs}))
        .catch(err => res.redirect(`/error?error=${err}`))    
})

////////////GET route to render EDIT list form///////////
router.get("/edit/:listId", (req,res) => {
    const listId = req.params.listId
    const session = req.session
    List.findById(listId)
        .then(list => {
            res.render("lists/edit", {list, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


///////////PUT route to UPDATE list/////////////




///////////PUT route to UPDATE list SONGS/////////////
router.put("/songs/:listId", (req,res) => {
    let listId = req.params.listId       
    /////change list contents to array of checked songs ids///////
    req.body.listContents = Object.keys(req.body)
    ///////change list length to sum of song lengths///////////
    Song.find({_id: {$in: Object.keys(req.body)}})
        .then(songs => {
            let totalSeconds = 0 
            songs.forEach(song => {
                totalSeconds += song.seconds
                totalSeconds += (song.minutes * 60)
            })
            req.body.seconds = totalSeconds % 60
            req.body.minutes = (totalSeconds - req.body.seconds) / 60
            List.findById(listId)
                .then(list => {
                    return list.updateOne(req.body)
                })                
                .catch(err => res.redirect(`/error?error=${err}`))   
        })
        .then(() => {
            res.redirect(`/lists/${listId}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`)) 
})

//////////GET route to render DELETE list view////////////
router.get("/delete/:listId", (req,res) => {
    const listId = req.params.listId
    const session = req.session
    List.findById(listId)
        .then(list => {
            res.render("lists/delete", {list, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

///////////////DELETE route to DELETE list////////////
router.delete("/:listId", (req,res) => {
    const listId = req.params.listId
    List.findById(listId)
        .then(list => {
            if (list.owner == req.session.groupId) {
                list.deleteOne()
                res.redirect("/lists")
            } else {
                res.redirect(`/error?error=only%20group%20members%20may%20delete%20lists`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


////Export Router///////
module.exports = router