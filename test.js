var express = require('express');
var app = express();

var port = process.env.port || 5000;

app.get('/',function(req, res){
    res.send("Hello World!");
});

app.listen(port,function(){
    console.log("App has started with port: ", port);
});