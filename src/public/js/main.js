$(function () {
    const socket = io();

    // obtaining DOM elements from the interface
    const $messageForm = $('#message-form');
    const $messageInput = $('#message');
    const $chat = $('#chat');


    // events

    $messageForm.submit( e => {
        e.preventDefault();
        console.log('send message', $messageInput.val());
    })

})