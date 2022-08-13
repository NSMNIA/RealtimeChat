const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', (socket) => {
    socket.emit('message', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });

    // To everyone except the sender
    socket.broadcast.emit('message', {
        from: 'Admin',
        text: 'New user joined'
    });

    socket.on('disconnect', (e) => {
        console.log(e);
        // Let everyone know user has left
        io.emit('message', {
            from: 'Admin',
            text: 'User has left'
        })
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})