// Dependencies
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
require("dotenv").config()
const methodOverride = require("method-override")



// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  // Database Connection Error / Success
  const db = mongoose.connection
  db.on("error", (err) => console.log(err.message + " is mongod not running?"))
  db.on("connected", () => console.log("mongo connected"))
  db.on("disconnected", () => console.log("mongo disconnected"))

// Middleware
app.use(methodOverride("_method"))
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))
//Express Sessions
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

// I N D U C E S 
// INDEX | NEW | DELETE | UPDATE | CREATE | EDIT | SHOW 

// INDEX 
app.get("/", (req, res) => {
  if (req.session.currentUser) {
    res.render("dashboard.ejs", {
      currentUser: req.session.currentUser,
    })
  } else {
    res.render("index.ejs", {
      currentUser: req.session.currentUser,
    })
  }
})
    
 
// Routes / Controllers/users.js
const userController = require("./controllers/users")
app.use("/users", userController)
// Routes / Controllers/sessions.js
const sessionsController = require("./controllers/sessions")
app.use("/sessions", sessionsController)


// Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))