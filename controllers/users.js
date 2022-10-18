///////////dependencies//////////////////
const express = require("express")
const User = require("../models/users")
const bcrypt = require("bcryptjs")
const { Session } = require("express-session")

const router = express.Router()


////////signup GET route to render signup page
router.get("/signup", (req,res) => {
    res.render("users/signup")
})

//////signup POST to send user info//////////////////
router.post("/signup", async (req,res) => {
        req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    User.create(req.body)
        .then(user => {
            res.redirect("/user/login")
        })
        .catch(error => {
            res.redirect(`/error?error=username%20already%20taken`)
        })
})


//////////login GET route to render login page//////////
router.get("/login", (req,res) => {
    res.render("users/login")
})

////////login POST route to submit login///////////
router.post("/login", async (req,res) => {
    const {username, password} = req.body
    User.findOne({username})
        .then(async (user) => {
            if (user) {
                const passwordMatches = await bcrypt.compare(password, user.password)
                if (passwordMatches) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id
                    req.session.email = user.emailAddress
                    req.session.userImg = user.img
                    res.redirect("/groups")
                } else {
                    res.redirect(`/error?error=password%20incorrect`)
                }
            } else {
                res.redirect(`/error?error=user%20doesn't%20exist`)
            }
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

///////GET route to render logout////////
router.get("/logout", (req,res) => {
    const session = req.session
    res.render("users/logout", {session})
})

/////////logout route/////////////
router.delete("/logout", (req, res) => {
    req.session.destroy(err => {
        console.log("error on logout?", err)
        res.redirect("/")
    })
})

////////GET route to render EDIT page/////////
router.get("/edit/:userId", (req,res) => {
    const userId = req.params.userId
    const session = req.session
    User.findById(userId)
        .then(user => {
            res.render("users/edit", {user, session})
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

////////PUT route to EDIT user (not including password)/////////
router.put("/:userId", (req,res) => {
    const userId = req.params.userId
    User.findById(userId)
        .then(user => {
            if (userId == req.session.userId) {
                req.session.username = req.body.username
                req.session.email = req.body.emailAddress
                req.session.userImg = req.body.img
                req.session.save()
                return user.updateOne(req.body)
            } else {
                res.redirect("/error?error=log%20in%20as%20user%20to%20update")
            }
        })
        .then(res.redirect("/groups"))
        .catch(err => res.redirect(`/error?error=${err}`))
})

module.exports = router