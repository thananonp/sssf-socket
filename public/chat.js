"use strict";

const socket = io();

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let user = document.getElementById("nickname").value;
    if (user == "") {
        user = "anonymous";
    }
    let channel = document.getElementById("channel").textContent;
    const inp = document.getElementById("m");
    if (inp.value.startsWith("/", 0)) {
        socket.emit("command", inp.value, channel);
    } else {
        socket.emit("chat message", user, channel, inp.value);
    }
    inp.value = "";
});

let updateChannel = (channel) => {
    document.getElementById("channel").innerText = channel;
};

function serverMessage(msg) {
    socket.emit("self message", msg);
}

socket.on("command", (msg, channel) => {
    console.log("command issued: " + msg);
    if (msg.startsWith("/join ")) {
        let newchannel = msg.replace("/join ", "");
        socket.emit("join", newchannel, channel);
        updateChannel(newchannel);
    } else if (msg.startsWith("/leave")) {
        let newchannel = "global";
        socket.emit("leave", channel);
        updateChannel(newchannel);
    } else if (msg.startsWith("/howmany")) {
        socket.emit("howmany");
    } else if (msg.startsWith("/help")) {
        serverMessage(
            "Nice try hackerman!"
            // "<b><u>COMMANDS</u></b></br>" +
            // "<tt>/join channelname</tt> join a channel</br>" +
            // "<tt>/leave</tt> leave a channel"
        );
    } else {
        serverMessage(
            'Error: command "' +
            (msg.split(" ", [0]) == "" ? msg : msg.split(" ", [0])) +
            ' what did you type in here man there is no such command!'
        );
    }
});

socket.on("chat message", (user, channel, msg) => {
    const item = document.createElement("li");
    item.innerHTML = "<b>" + user + "</b>: " + msg;
    document.getElementById("messages").appendChild(item);
});

socket.on("self message", (msg) => {
    const item = document.createElement("li");
    item.innerHTML = msg;
    document.getElementById("messages").appendChild(item);
});

updateChannel("global");