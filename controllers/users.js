///////////dependencies//////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const router = express.Router()


////////signup GET route to render signup page
router.get("/signup", (req,res) => {
    res.render("users/signup")
})

//////signup POST to send user info//////////////////
router.post("/signup", async (req,res) => {
    console.log("This is the body input for signup: ", req.body)
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    User.create(req.body)
        .then(user => {
            res.redirect("/user/login")
        })
        .catch(error => {
            console.error(error)
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
                    console.log("this is req.session: ", req.session)

                    res.redirect("/")
                } else {
                    res.redirect(`/error?error=password%20incorrect`)
                }
            } else {
                res.redirect(`/error?error=user%20doesn't%20exist`)
            }
        })
        .catch(err => {
            console.error(err)
            res.redirect(`/error?error=${err}`)
        })
})

///////GET route to render logout////////
router.get("/logout", (req,res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render("users/logout", {username, loggedIn, userId})
})

/////////logout route/////////////
router.delete("/logout", (req, res) => {
    req.session.destroy(err => {
        console.log("session after logout: ", req.session)
        console.log("error on logout?", err)
        res.redirect("/")
    })
})


module.exports = router