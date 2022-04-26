const express = require('express');
const PORT = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var users =new Map();

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('user connected', (user) =>{
        users.set(socket.id, user);
        io.emit('user connected',Array.from(users.values()) );
    })
    socket.on('chat message', ({msg, user, id}) => {
        io.emit('chat message', {msg, user, id});
      });

    socket.on('disconnect', () =>{
        users.delete(socket.id);
        io.emit('user connected', Array.from(users.values()));
    })
});

server.listen(PORT, () => {
    console.log('listening on port: http://localhost:3000');
})