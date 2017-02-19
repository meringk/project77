var trip = require('./blog/trip_controller'),
    main = require('./main/main_controller'),
    write = require('./write/write_controller'),
    chat = require('./chat/chat_controller');

module.exports = function (app) {

    return {
        init: init
    }


    function init() {
        app.use('/trip', trip);
        app.use('/', main);
        app.use('/write', write);
        app.use('/chat',chat);
    }
}