///////dependencies//////////////
require("dotenv").config()
const express = require("express")

const middleware = require("./utility/middleware")

////express application object////////
const app = require("liquid-express-views")(express())

//////Middleware/////
middleware(app)









/////Server Listener///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))