// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// this selects our port and listens
// note that we're now storing our app.listen within
// a variable called server. this is important!!
var server = app.listen(8000, function() {
 console.log("listening on port 8000");

});
// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server)
var chats = [];
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log("Socket ID:"+socket.id);

  //all the socket code goes in here!
      //  EMIT:
    //socket.emit('posting_form');
    //  BROADCAST:
    // socket.broadcast.emit("my_broadcast_event", "hello");
    // //  FULL BROADCAST:
    //io.emit("send");

	socket.on("button_clicked", function (data){
		console.log(data);
    var message = data.name + ": " + data.message;
	  io.emit('server_response', {response: message});
    chats.push(message);

  })
  socket.on('history', function(data){
    socket.emit('server_responses', {response: chats});
	})
})
