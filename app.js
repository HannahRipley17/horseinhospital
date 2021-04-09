url = "ws://localhost:8080"

generateRandomComment = (senderName, message) => {
    var data = {
        senderName: senderName,
        message: message
    };
    return socket.send(JSON.stringify(data));
};

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
    socket.send(JSON.stringify(data));
};

updateScroll = () => {
    var element = document.querySelector("#commentList");
    element.scrollTop = element.scrollHeight + 1000;
};


// TODO
// fix commentbox styling
// deploy 

var app = new Vue({
    el: '#app',
    data: {
        socket: null,
        showShortList: true,
        showWholeList: false,
        newMessage: '',
        senderName: 'user' + Math.floor(Math.random() * 1000),
        messageList: [
            {senderName: "user123", message: "there shouldn't be a horse in the hospital!!!"},
        ],
        newsList: [
            {
                title: "Hospital Horse",
                snippet: "At 2:30pm today, a horse got into the St Johns Hospital for Sick People.",
                newsoutlet: "XYZ News",
                time: "3:45pm",
                date: "April 8, 2021"
            }
        ],
        comments: [
            "how did this happen?",
            "who let in the horse?",
            "this is terrible!",
            "lol horse",
            "horse suck",
            "i would ride on the horse all around the hospital",
            `shut up user${Math.floor(Math.random() * 1000)}, you literally have no idea what you're talking about!`,
            "i'm going to sue the horse",
            "hey guys please check out my instagram, i'm trying to get word out about my music ~~***<3***~~",
            "this is fake news",
            "I think eventually everything is going to be ok, but I have no idea what's going to happen next :/",
            "it's never happened before!",
            "no one knows what's going to happen next, least of all the horse! he's never been in a hospital before!",
            "the poor horse is as confused as you are",
            "well i once saw a bird in an airport",
            "shut up bird guy! we've all seen a bird in an airport, this is a horse in a hospital!",
            "i didn't know the horse knew how to use an elevator...",
            "there shouldn't be a horse in the hospital!!!",
            "we're well beyond that!",
            "maybe the horse catcher will catch the horse",
            "the horse has fired the horse catcher!",
        ],
        headers: [
            "Horse loose in hospital",
            "Horse runs amok in a hospital",
            "Patients trampled by wild horse",
            "Horse uses the elevator",
            "Hospital Horse is being suspiciously quiet",
            "There's a horse loose in a hospital",
            "Hospital Horse fired the horse catcher",
            "Hospital Horse intends to stomp patients with hooves",
            "St John Hospital for Sick People asks horse to leave, horse runs away",
        ],
        snippetStarts: [
            "Hospital Horse has started to ",
            "Today at 2:30pm, a horse got into the St John Hospital for Sick People and began to ",
            "People are worried the horse may ",
            "St John Hospital for Sick People is worried that Hospital Horse will ",
            "Sources are unclear as to who let the horse ",
            "Hospital Horse says 'I'm going to run towards the baby incubators and smash them with my hooves i have nice hooves and a big tail i'm a horse'. People fear the horse will ",
            "No one has heard from the Hospital Horse in a while. Everyone fears the horse will ",
            "The horse catcher was supposed to stop the horse but the horse fired him. Now there is no one to stop the horse's determination to "
        ],
        verbs: [
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
            "knock over the IV bags"
        ],
        snippetEnds: [
            " in a hospital.",
            " at the St John Hospital for Sick People.",
            ", squishing all the patients.",
            ", killing 37 people.",
            ". No one knows how the horse got into the hospital.",
            " and harm patients",
            ". No one seems to be doing anything about it."

        ],
        outlets: [
            "CMM News",
            "Jackal News",
            "NCB News",
            "XYZ News",
        ]
    },

    
    methods: {
        connectSocket: function() {
            console.log("gonna connect a socket");
            socket = new WebSocket(url); // connect to the server
            socket.onmessage = (event) => {
                this.getMessage(event)
            }
        },

        getMessage: function(event) {
            var data = JSON.parse(event.data);
            if (data.title) {
                console.log(data);
                this.newsList.unshift(data);

            } else {
                this.messageList.push(data);
                if (this.messageList.length > 20) {
                    this.messageList.splice(0, 1);
                }
            }
            
            // fun fact - data from a websocket is always a string but it could be a json string
            // gotta JSON.stringify like in sendMessage and then JSON.parse it when you get it back
        },

        sendMessage: function() {
            var data = {
                senderName: this.senderName,
                message: this.newMessage
            };
            socket.send(JSON.stringify(data)); // send the message to the server

            this.newMessage = '';
        },

        showTheWholeList: function() {
            this.showWholeList = true;
            this.showShortList = false;
        },
        showTheShortList: function() {
            this.showWholeList = false;
            this.showShortList = true;
        },
        
        
        

        makePost: function() {
            let headers = [...this.headers];
            let snippetStarts = [...this.snippetStarts];
            let verbs = [...this.verbs];
            let snippetEnds = [...this.snippetEnds];
            let outlets = [...this.outlets];

            let randomTime = Math.floor(Math.random() * 10000);
            
            setInterval(function() {

                let title = headers[Math.floor(Math.random() * headers.length)];
                let snippet = snippetStarts[Math.floor(Math.random() * snippetStarts.length)] + verbs[Math.floor(Math.random() * verbs.length)] + snippetEnds[Math.floor(Math.random() * snippetEnds.length)];
                let outlet = outlets[Math.floor(Math.random() * outlets.length)];
            
                generateRandomPost(title, snippet, outlet);
            }, randomTime);
        },
        makeComment: function() {
            let comments = [...this.comments];
            let randomTime = 4000;
            setInterval(function() {
                randomTime = Math.floor(Math.random() * 2000);
                let senderName = "user" + Math.floor(Math.random() * 1000);
                let message = comments[Math.floor(Math.random() * comments.length)];
                generateRandomComment(senderName, message); 
                updateScroll();
            }, randomTime);
        },
    },
    created: function() {
        console.log("loaded Vue :)");
        this.connectSocket();
        this.makePost();
        this.makeComment();

    }
});



// what data will i need?
// mostly going to be incoming from server


// FEED
// {
//     "title": "a horse has gotten into a hospital",
//     "snippet": "Today at 2:30pm, a horse got into the St John Hospital for Sick People in Washington DC",
//     "news-outlet": "CMM News"
// }

// {
//     "title": "Horse runs rampant in hospital",
//     "snippet": "St John Hospital for Sick People in Washington DC has a horse inside",
//     "news-outlet": "XYZ News"
// }

// COMMENTS
// {
//     "user": "randomUser284",
//     "comment": "lol bro a horse? horses arent supposed to be in a hospital. "
// }

// {
//     "user": "thoughtfulPerson392",
//     "comment": "This is terrible! I'm so worried for the sick people :("
// }

// {
//     "user": "l0serguy",
//     "comment": "this is stupid. i see birds in airports all the time, what's the difference?"
// }

// {
//     "user": "ybjndkuser",
//     "comment": "a horse shouldn't be in a hospital!!!"
// }



// FUNCTIONS i'll need:
// function for each fake news site with different personalities
// - random post generator - title and snippet templates that pick random nouns and verbs from a listenerCount

// basially same thing for users