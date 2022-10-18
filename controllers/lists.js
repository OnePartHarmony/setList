////dependencies////
const express = require("express")
const List = require("../models/lists")
const Song = require("../models/songs")

/////function to reorder array, from "array-move" that doesn't import properly from node modules////////
function arrayMoveMutable(array, fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

		const [item] = array.splice(fromIndex, 1);
		array.splice(endIndex, 0, item);
	}
}
function arrayMoveImmutable(array, fromIndex, toIndex) {
	array = [...array];
	arrayMoveMutable(array, fromIndex, toIndex);
	return array;
}

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
        .catch(err => res.redirect(`/error?error=${err}`))
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
    List.findById(listId)
        .populate("notes.author", "username")
        .populate("listContents")
        .then(list => res.render("lists/show", {list, session}) )
        .catch(err => res.redirect(`/error?error=${err}`))
})


///////////////GET route to view SONGS to add to list list/////////////
router.get("/songs/:listId", (req,res) => {
    const listId = req.params.listId
    const session = req.session
    let newSongs = []
    List.findById(listId)
        .populate("listContents")
        .then(list => {
            ///////find all songs by list's group, and only add songs not in list to newSongs////////
            Song.find({owner: {$eq: list.owner}})
                .then(songs => {
                    songs.forEach(song => {
                        if (!list.listContents.find(listSong => listSong.id == song.id)){
                            newSongs.push(song)
                        }
                    })
                })
                .catch(err => res.redirect(`/error?error=${err}`))
            return list
        })
        .then(list => res.render("lists/addSongs", {list, session, newSongs}))
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

///////////PUT route to UPDATE list ORDER/////////////
router.put("/reorder/:listId/:startPos/:newPos", (req,res) => {
    const listId = req.params.listId
    const startPos = req.params.startPos
    const newPos = req.params.newPos    
    List.findById(listId)
        .then(list => {
            const newList = arrayMoveImmutable(list.listContents, startPos, newPos)
            req.body.listContents = newList
            return list.updateOne(req.body)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


///////////PUT route to UPDATE list SONGS/////////////
router.put("/songs/:listId", (req,res) => {
    const listId = req.params.listId       
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

///////////PUT route to UPDATE list/////////////
router.put("/:listId", (req,res) => {
    const listId = req.params.listId
    List.findById(listId)
        .then(list => {
            return list.updateOne(req.body)
        })
        .then(res.redirect(`/lists/${listId}`))
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
