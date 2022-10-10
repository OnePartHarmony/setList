///////dependencies//////////////
require("dotenv").config()
const express = require("express")
const middleware = require("./utility/middleware")

///////////import routes///////////////
const UserRouter = require(".controllers/users")
const GroupRouter = require("./controllers/groups")
const SongRouter = require("./controllers/songs")

////express application object////////
const app = require("liquid-express-views")(express())

//////Middleware/////
middleware(app)

//////Home Route//////////
app.get("/", (req,res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render("index.liquid", {username, loggedIn, userId})
})


////////Register Routes/////////
app.use("/user", UserRouter)
app.use("/groups", GroupRouter)
app.use("/songs", SongRouter)



//////error route/////////
app.get("/error", (req,res) => {
    // const username = req.session.username
    // const loggedIn = req.session.loggedIn
    // const userId = req.session.userId
    const {username, loggedIn, userId} = req.session
    const error = req.query.error || "This page does not exist"
    res.render("error.liquid", {error, username, loggedIn, userId})
})


//////catch-all route for non-existent paths/////
app.all("*", (req,res) => {
    res.redirect("/error")
})


/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))