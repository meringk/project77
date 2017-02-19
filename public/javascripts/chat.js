var socket =  
  io.connect('http://localhost');

var enter = $('#enter'),
    message = $('#message'),
    chatBox = $('.chatBox');

enter.click(function(){
    console.log(message.val());
    socket.emit('msg', message.val());
    message.val("");
});


socket.on('msg2', function (data) {
    console.log('client : ', data);
    console.log(chatBox);
    chatBox.append('<div>'+data+'</div>');
});
