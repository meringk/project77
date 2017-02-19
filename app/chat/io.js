var socket = require('socket.io');

var ioController = {
    init: init,
}

function init(server) {

    var io = socket.listen(server);

    //console.log('init io : ', io);
    io.on('connection', function (socket) {
        console.log("입장")
        socket.on('msg', function (data) {
            console.log(data)
            socket.emit('msg2', data);
        });
    });

}

module.exports = ioController;