var db = require('../lib/pgDb.js');
var tripService = {
    selectTripData : selectTripData,
    selectTripDataInit : selectTripDataInit
}



//INIT
function selectTripDataInit(param) {
    return new Promise(function (resolve, reject) {
        console.log(param)
        var query = "select * FROM tb_trip where t_zoom = $1 order by 1 asc";

        db.query(query, [param.zoom])
            .then(function (data) {
                console.log(data)
                resolve(data);
            })
            .catch(function (error) {
                console.log(data)
                reject(error);
            });
    });
}

// ZOOM
function selectTripData(param) {
    return new Promise(function (resolve, reject) {

        var query = "select * FROM tb_trip where t_zoom <= $1 AND $2 < cast( t_lat as numeric) AND cast( t_lat as numeric) < $3 AND $4 < cast(t_lng as numeric) AND cast(t_lng as numeric)  < $5 order by 1 asc";

        db.query(query, [param.zoom, param.startLat, param.endLat, param.startLng, param.endLng])
            .then(function (data) {
                console.log(data)
                resolve(data);
            })
            .catch(function (error) {
                console.log(data)
                reject(error);
            });
    });
}


module.exports = tripService;