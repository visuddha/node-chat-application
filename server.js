var bodyParser = require("body-parser");
var express = require("express");

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var DB_URL = "mongodb+srv://<db_url>";

mongoose.connect(DB_URL, { useNewUrlParser: true }).then((err) => console.log("connected to mongoDB"));

var Message = mongoose.model("Message", {
    name: String,
    message: String
})


app.get('/messages', (req, res) => {
    Message.find({}).then((data)=>{
        res.send(data);
    })
})

app.get('/messages/:user', (req, res) => {
    var user = req.params.user;
    Message.find({name : user})
    .then((data)=>{
        res.send(data);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save().then(() => {
        io.emit('message', req.body);
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500)
    })

})

io.on('connection', (socket) => {
    console.log("a user connected");
})



let server = http.listen(3001, () => console.log("server listing on port", server.address().port));