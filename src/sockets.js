// SERVER SOCKETS

module.exports = function (io) {

    let nicknames = [

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
                updateNicknames();
            }
        });
// field nickname added
        socket.on('send message', data => {
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            })
        })

        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            updateNicknames();
        })

        function updateNicknames() {
            io.sockets.emit('usernames', nicknames)
        }
    });
}