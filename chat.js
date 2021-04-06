'use strict';

const socket = io();

console.log("CHAT.JS")

document.querySelector('form').addEventListener('submit', (event) => {
    console.log(event)
    event.preventDefault();
    const inp = document.getElementById('m');
    socket.emit('chat message', inp.value);
    inp.value = '';
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.innerHTML = msg;
    document.getElementById('messages').appendChild(item);
});
