var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.port || 5000;

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(port,function(){
    console.log("App has started with port: ", port);
});

var messageHistory = []

io.sockets.on('connection', function(socket){
    console.log("new user connected with id <" + socket.id + '>');
    socket.emit('data', messageHistory);
    socket.join('private_room', () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'private_room' ]
    });
    socket.on('sendmsg', function(data){
        console.log('server: ' + data);
        messageHistory.push(String(data));
        socket.broadcast.emit('updateHeader', data);
    });
});