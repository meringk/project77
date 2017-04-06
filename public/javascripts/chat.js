var socket =  
  io.connect('http://localhost:800');

var enter = $('#enter'),
    message = $('#message'),
    chatBox = $('.chatBox');

enter.click(function(){
    console.log(message.val());
    socket.emit('fromMsg', message.val());
    message.val("");
});


socket.on('toMsg', function (data) {
    console.log('client : ', data);
    console.log(chatBox);
    chatBox.append('<div>'+data+'</div>');
});
