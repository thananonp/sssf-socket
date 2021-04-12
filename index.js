"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
let peopleOnline = 0

io.on("connection", (socket) => {
    peopleOnline ++
    console.log("a user connected", socket.id);
    socket.join('global');
    socket.emit("self message", `Welcome to chat! You are in default channel. There are currently ${peopleOnline} people online`);
    socket.on("disconnect", () => {
        peopleOnline --
        console.log("a user disconnected", socket.id);
    });

    socket.on("chat message", (user, channel, msg) => {
        console.log("message: " + user + " @ " + channel + ": " + msg);
        io.to(channel).emit("chat message", user, channel, msg);
    });

    socket.on("join", (channel) => {
        console.log("user " + socket.id + " joined channel " + channel);
        socket.leave('global');
        socket.join(channel);
    })

    socket.on("leave", (channel) => {
        console.log("user " + socket.id + " joined channel global");
        socket.leave(channel);
        socket.join('global');
    })

    socket.on("command", (msg) => {
        console.log("command: ", msg);
        socket.emit("command", msg);
    });

    socket.on("self message", (msg) => {
        console.log("selfmessage: ", msg);
        socket.emit("self message", msg);
    });
    socket.on("howmany", (msg) => {
        socket.emit("self message",`There are currently ${peopleOnline} people online`);
    });
});

http.listen(3000, () => {
    console.log("listening on port 3000");
});