const socket = io('https://chat-backend-yj1p.onrender.com/');
const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");
var audio = new Audio('tone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value.trim();
    
    if (message === "") {
        alert("Cannot send an empty message.");
        return; // Prevent sending empty messages
    }

    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = '';
})

const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(` ${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(` ${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    append(` ${name}: left the chat`, 'left');
});

