var trip = require('./blog/trip_controller');

module.exports = function(app){

    return {
        init: init
    }


    function init(){
        app.use('/trip', trip);
    }
}