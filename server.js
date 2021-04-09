// using node.js as a server

const express = require('express');
const WebSocket = require('ws');

const port = process.env.PORT || 8080;
var app = express();

app.get('/foobars', function (req, res) {
    res.sendStatus(200);
});

app.post('foobars', function (req, res) {
    res.sendStatus(201);
    broadcastToEveryone("bob created a new foobar");
})

var server = app.listen(port, function () {
    console.log("Server is listening on port", port)
});


// WebSocket stuff
const wss = new WebSocket.Server({ server: server });

function broadcastToEveryone(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        }
    });
};

function sendData(client, data) {
    client.send(JSON.stringify(data));
}

wss.on('connection', function (newClient) { // when a new incoming client first connects
    console.log("a new client just connected to the server!");
    newClient.on('message', function (data) { // when the new client sends something to the server
        console.log("a client just sent a message to the server: ", data);
        broadcastToEveryone(data);
    });
});