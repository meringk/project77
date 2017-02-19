var db = require('../lib/pgDb.js');
var chatService = {
    // selectTripData : selectTripData
}


// //INIT
// function selectTripDataInit(param) {
//     return new Promise(function (resolve, reject) {
//         console.log(param)
//         var query = "select * FROM tb_trip where t_zoom = $1 order by 1 asc";

//         db.query(query, [param.zoom])
//             .then(function (data) {
//                 console.log(data)
//                 resolve(data);
//             })
//             .catch(function (error) {
//                 console.log(data)
//                 reject(error);
//             });
//     });
// }

module.exports = chatService;