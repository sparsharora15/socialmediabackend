const express = require('express')
const app = express();
const port = process.end.PORT || 5000;
const cors = require("cors")
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json()); 
app.use(express.json())
const { connect } = require('./db/db')
connect()
const user = require('./routes/user.routes')
const posts = require('./routes/posts.routes')
app.use(express.static('uploads'))
app.use('/', user)
app.use('/', posts)
app.listen(port, () => {
    console.log("connected to view port " + port);
})