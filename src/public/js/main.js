// CLIENT SOCKETS

$(function () {
    const socket = io();

    // obtaining DOM elements from the interface
    const $messageForm = $('#message-form');
    const $messageInput = $('#message');
    const $chat = $('#chat');

    // obtaining DOM elements from the login interface

    const $nickForm = $('#nickForm');
    const $nickname = $('#nickname ');
    const $nickError = $('#nickError');

    const $users = $('#usernames');

    // events


    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data => {
            if(data){
                $('#nickWrap').hide();
                $('#contentBox').show();
            } else{
                $nickError.html(`
                    <div class="alert alert-dismissible alert-danger">
                    <strong>Este user ya existe</strong>
                    </div>
                `)
            }
            $nickname.val('');
        })
    });

    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageInput.val());
        $messageInput.val('');
    });

    socket.on('new message', function (data) {
        $chat.append(data + '<br>')
    })

    socket.on('usernames', data => {
        let html = '';
        for (let i = 0; i < data.length; i++){
            html += `
            <p><i class="fas fa-user"></i>${data[i]}</p>  
            `
        }
        $users.html(html);
    })

})