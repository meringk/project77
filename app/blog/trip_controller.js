var express = require('express');
var router = express.Router();
var db = require('../lib/pgDb.js');
var tripService = require('./trip_service.js');


// 여행지 DB 불러오기
router.post('/selectTripDataInit', function (req, res) {
    param = req.body;
    tripService.selectTripDataInit(param)
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});
// 여행지 DB ZOOM 하면 불러오기
router.post('/selectTripData', function (req, res) {
    param = req.body;
    tripService.selectTripData(param)
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;