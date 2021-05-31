require('dotenv').config()
const express = require('express')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const app = express()
const port = 4000

const { checkAuthenticated } = require('./middleware/authentication');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const connectDB = require('./db')
connectDB();

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

const routes = require('./routes/index')

app.use('/api', routes)

app.get("/", function (req, res) {
    var tagline = "Working on paypal integration";
    res.render("table.ejs", { tagline: tagline });
});

app.get("/login", function (req, res) {
    res.render("login.ejs");
});

app.get("/dashboard", checkAuthenticated, function (req, res) {
    let user = req.user
    res.render("dashboard.ejs", { user });
});

app.get("/protected", function (req, res) {
    res.render("protected.ejs");
});

app.get("/logout", function (req, res) {
    res.clearCookie('session-token')
    res.redirect('/login')
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
