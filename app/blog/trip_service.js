var db = require('../lib/pgDb.js');
var tripService = {
    selectTripData : selectTripData
}

// 글 리스트 조회
function selectTripData() {
    return new Promise(function (resolve, reject) {
        var query = "select * FROM tb_trip where t_zoom = 1 order by 1 asc";
        db.query(query)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


module.exports = tripService;