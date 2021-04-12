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

let headers = [
    "Horse loose in hospital",
    "Horse runs amok in a hospital",
    "Patients trampled by wild horse",
    "Horse uses the elevator",
    "Hospital Horse is being suspiciously quiet",
    "There's a horse loose in a hospital",
    "Hospital Horse fired the horse catcher",
    "Hospital Horse intends to stomp patients with hooves",
    "St John Hospital for Sick People asks horse to leave, horse runs away",
    "Patient tries to ride Hospital Horse, falls off and breaks a leg",
    "Hospital Horse is doing clerical work, helping the hospital greatly",
    "Horse tries to unplug ventilator but cannot due to a lack of fingers",
];

let snippetStarts = [
    "Hospital Horse has started to ",
    "Today at 2:30pm, a horse got into the St John Hospital for Sick People and began to ",
    "People are worried the horse may ",
    "St John Hospital for Sick People is worried that Hospital Horse will ",
    "Sources are unclear as to who let the horse ",
    "Hospital Horse says 'I'm going to run towards the baby incubators and smash them with my hooves i have nice hooves and a big tail i'm a horse'. People fear the horse will ",
    "No one has heard from the Hospital Horse in a while. Everyone fears the horse will ",
    "The horse catcher was supposed to stop the horse but the horse fired him. Now there is no one to stop the horse's determination to "
];

let verbs = [
    "run amok",
    "rampage",
    "destroy the hospital",
    "go wild",
    "run wild",
    "trample",
    "eat hospital equipment",
    "knock everything over",
    "kick the patients",
    "pee on the doctors",
    "catch COVID",
    "kick everything",
    "knock over the IV bags",
    "commit unspeakable acts of violence",
    "is actually a spy for bad guys",
    "will try to do surgery"
];

let snippetEnds = [
    " in a hospital.",
    " at the St John Hospital for Sick People.",
    ", squishing all the patients.",
    ", killing 37 people.",
    ". No one knows how the horse got into the hospital.",
    " and harm patients",
    ". No one seems to be doing anything about it."

];

let outlets = [
    "CMM News",
    "Jackal News",
    "NCB News",
    "XYZ News",
];
    
setInterval(() => {
    let title = headers[Math.floor(Math.random() * headers.length)];
    let snippet = snippetStarts[Math.floor(Math.random() * snippetStarts.length)] + verbs[Math.floor(Math.random() * verbs.length)] + snippetEnds[Math.floor(Math.random() * snippetEnds.length)];
    let outlet = outlets[Math.floor(Math.random() * outlets.length)];

    generateRandomPost(title, snippet, outlet);
}, Math.floor(Math.random() * 10000));


generateRandomPost = (title, snippet, outlet) =>  {
    let ampm = "am";
    let hours = new Date().getHours();
    if (hours > 12) {
        ampm = "pm";
        hours -= 12
    }
    let minutes = new Date().getMinutes();
    let time = hours + ":" + minutes + ampm;
    var data = {
        title: title,
        snippet: snippet,
        newsoutlet: outlet,
        time: time
    };
    broadcastToEveryone(JSON.stringify(data));
};


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
        broadcastToEveryone(data);
    });
});