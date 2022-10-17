////dependencies//////
const express = require("express")
const List = require("../models/lists")
const Song = require("../models/songs")

////create router///////
const router = express.Router()

//////////Routes//////////

/////////POST route to create new note on song or list (only if user is working as the group the song is in)////////
router.post("/:songOrListId", (req,res) => {
    const id = req.params.songOrListId
    req.body.author = req.session.userId
    req.body.date = new Date().toLocaleString()
    Song.findById(id)
        .then(song => {
            if (song == null) {
                List.findById(id)
                    .then(list => {
                        if (list.owner == req.session.groupId) {
                            list.notes.push(req.body)
                            list.save()
                            res.redirect(`/lists/${list.id}`)                            
                        } else {
                            res.redirect(`/error?error=work%20as%20group%20to%20create%20note`)
                        }
                    })
                    .catch(err => res.redirect(`/error?error=${err}`))
            } else {
                if (song.owner == req.session.groupId) {
                    song.notes.push(req.body)
                    song.save()
                    res.redirect(`/songs/${song.id}`)
                } else {
                    res.redirect(`/error?error=work%20as%20group%20to%20create%20note`)
                }
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


////////DELETE route to remove note from song or list (only can be done by author of note)///////////
router.delete("/delete/:songOrListId/:noteId", (req,res) => {
    const id = req.params.songOrListId
    const noteId = req.params.noteId
    Song.findById(id)
        .then(song => {
            if (song == null) {
                List.findById(id)
                    .then(list => {
                        const listNote = list.notes.id(noteId)
                        if (listNote.author == req.session.userId) {
                            listNote.remove()
                            list.save()
                            res.redirect(`/lists/${list.id}`)
                        } else {
                            res.redirect(`/error?error=note%20may%20only%20be%20deleted%20by%20its%20creator`)
                        }
                    })
                    .catch(err => res.redirect(`/error?error=${err}`))
            } else {
                const songNote = song.notes.id(noteId)
                if (songNote.author == req.session.userId) {
                    songNote.remove()
                    song.save()
                    res.redirect(`/songs/${song.id}`)
                } else {
                    res.redirect(`/error?error=note%20may%20only%20be%20deleted%20by%20its%20creator`)
                }
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})








////Export Router///////
module.exports = router