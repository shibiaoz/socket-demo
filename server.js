var WebSocketServer = require("websocketserver");
var server = new WebSocketServer("none", 9000);
var connectionList = [];
server.on("connection", function(id) {
    console.log('connection from client => '+  id);
    connectionList.push(id);
});

server.on("closedconnection", function(id) {
    console.log("Connection " + id + " has left the server");
});


server.on("message", function(data, id) {
    var mes = server.unmaskMessage(data);
    var str = server.convertToString(mes.message);
    console.log('message =>' + str);
});

setInterval( () => {
    console.log('send message to client....');
    connectionList.forEach( (id) => {
        server.sendMessage("one", "Welcome to the server!", id);
    });
},2000);
