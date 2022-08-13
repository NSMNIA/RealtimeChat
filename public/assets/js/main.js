const socket = io();

const messages = document.querySelector('#messages');

socket.on('message', (message) => {
    messages.innerHTML += `<p>${message.from}: ${message.text}</p>`;
});

document.getElementById('chatform')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    // get parameter from url
    const username = window.location.search.match(/\?username=(.*)/)[1];
    socket.emit('chatMessage', {
        from: username,
        text: message
    });
    e.target.elements.message.value = '';
    e.target.elements.message.focus();
});

