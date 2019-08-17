module.exports = function (io) {
    io.on('connection', function(socket) {
        console.log('new user connected');

        socket.on('send message', function (data){
            io.sockets.emit('new message', data)
        })
    });
}