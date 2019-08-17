$(function () {
    const socket = io();

    // obtaining DOM elements from the interface
    const $messageForm = $('#message-form');
    const $messageInput = $('#message');
    const $chat = $('#chat');


    // events

    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageInput.val());
        $messageInput.val('');
    });

    socket.on('new message', function (data) {
        $chat.append(data + '<br>')
    })

})