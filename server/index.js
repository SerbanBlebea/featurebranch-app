const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const User = require('./database/models/User')

const PORT = 8080;

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(require('./controllers'))


app.listen(PORT, ()=> {
    console.log(`app started on port ${PORT}`)
})
