// SERVER SOCKETS

module.exports = function (io) {

    let nicknames = [
        'fazt',
        'ryan',
        'jhon'
    ] //save memory server

    io.on('connection', function(socket) {
        console.log('new user connected');
// field chat added
        socket.on('new user', function (data, cb) {
            console.log(data);
            if(nicknames.indexOf(data) != -1){
                cb(false);
            }else {
                cb(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
                io.sockets.emit('usernames', nicknames)
            }
        });
// field nickname added
        socket.on('send message', function (data){
            io.sockets.emit('new message', data)
        })

        socket.on('disconnect', data => {
            if(!socket.nickname) return;
        })
    });
}