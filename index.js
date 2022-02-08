const express = require('express');
const app = express();

const { readdirSync } = require('fs');
require('dotenv').config();

const path = require('path');
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const routeFiles = readdirSync('./routes').filter((file) => file.endsWith('.js'));

for (const routeFile of routeFiles) {
    console.log(routeFile);
    const route = require(`./routes/${routeFile}`);
    app.use(route.route, route.router);
}

//Sockets

io.on('connection', (socket) => {
    console.log('New bitch in the kingdom');
    socket.on('message', (username, msg) => {
        console.log(`Recieved message: [${username}]: ${msg}`);
        io.emit('receivedMessage', username, msg);
    });

})

//---------

server.listen(port, () => {
    console.log('Server started');
    console.log(`listening on ${port}`);
});



