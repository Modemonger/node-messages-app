const socket = io();

const chatBox = document.getElementById('chatBox');
const input = document.getElementById('input');
const username = document.getElementById('username');
const button = document.getElementById('sendButton');

function sendMessage(username ,msg) {
    socket.emit('message', username, msg);
}

socket.on('receivedMessage', (username, msg) =>{
    console.log(`[${username}]: ${msg}`);
    const div = document.createElement('div');
    const usernameElement = document.createElement('span');
    const messageElement = document.createElement('span');

    usernameElement.innerText = `[${username}]: `;
    messageElement.innerText = msg;
    usernameElement.classList.add('badge', 'bg-secondary');

    div.appendChild(usernameElement);
    div.appendChild(messageElement);
    chatBox.append(div);
})

button.onclick = (e) => {
    e.preventDefault();
    sendMessage(username.value, input.value)
}