// SERVER SOCKETS

module.exports = function (io) {

    // let nicknames = [
    //
    // ]

    let users = {

    };

    io.on('connection', function(socket) {
        console.log('new user connected');
// fields chat box
        socket.on('new user', function (data, cb) {
            console.log(data);
            // if(nicknames.indexOf(data) != -1){
            if (data in users){
                cb(false);
            }else {
                cb(true);
                socket.nickname = data;
                // users.push(socket.nickname);
                users[socket.nickname] = socket;
                updateNicknames();
            }
        });

// fields nickname list
        socket.on('send message', (data, cb) => {

            var msg = data.trim();

            if(msg.substr(0, 3) === '/w '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if(index != -1){
                    var name = msg.substring(8, index);
                    var msg = msg.substring(index + 1);
                    if (name in users){
                        users[name].emit('whisper', {
                            msg: msg,
                            nick: socket.nickname
                        });
                    } else {
                        cb('Error! please enter a valid user');
                    }
                } else {
                    cb('Error! please enter your message');
                }
            } else{
                io.sockets.emit('new message', {
                    msg: data,
                    nick: socket.nickname
                });
            }

        });

        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            // nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            delete users[socket.nickname];
            updateNicknames();
        })

        function updateNicknames() {
            // io.sockets.emit('usernames', nicknames)
            io.sockets.emit('usernames', Object.keys(users));
        }
    });
};
