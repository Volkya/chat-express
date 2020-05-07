const express = require('express');
const socketio = require('socket.io'); // objeto para puentes de comunicacion
const http = require('http'); // para la peticion http
const app = express();

// initializing server and sockets
const server= http.createServer(app);
const io = socketio.listen(server);
require('./database');
require('./sockets')(io);



const path = require('path'); // para los directorios
// settings env
app.set('port', process.env.PORT || 5000);
// static files
app.use(express.static(path.join(__dirname, 'public')));



// run the server
server.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
// console.log(__dirname);
