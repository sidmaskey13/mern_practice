require('dotenv').config()
const express = require('express')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

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

app.get('/', (req, res) => {
    res.send('Welcome to BLOG')
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
