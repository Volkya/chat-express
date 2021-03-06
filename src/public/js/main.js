// CLIENT SOCKETS LOGIC

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
    // SEND MESSAGE
    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageInput.val(), data => {
            $chat.append(`<p class="error">${data}</p>`)
        });
        $messageInput.val('');
    });
    // CAPTURA NICK AND MESAGE NEW
    socket.on('new message', data => {
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>')
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

    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`)
    })

    socket.on('load old msgs', msgs => {
        for (let i = 0; i < msgs.length; i++){
            displatMsgs(msgs[i]);
        }
    })
    
    function displatMsgs(data) {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`)
    }

});
