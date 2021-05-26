require('dotenv').config()
const express = require('express')
var cors = require('cors')
// const bodyParser = require('body-parser');
const app = express()
const port = 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const connectDB = require('./db')
connectDB();

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

const routes = require('./routes/index')
// const auth = require('./routes/auth')

app.use('/api', routes)
// app.use('/api/post', posts)

app.get("/", function (req, res) {
    var tagline = "Working on paypal integration";
    res.render("table.ejs", { tagline: tagline });
});

app.get("/test", function (req, res) {
    res.send('1232131231231')
});



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
