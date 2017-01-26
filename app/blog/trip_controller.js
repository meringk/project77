var express = require('express');
var router = express.Router();
var db = require('../lib/pgDb.js');
var tripService = require('./trip_service.js');

// 여행지 DB 불러오기
router.get('/selectTripData', function (req, res) {
    tripService.selectTripData()
        .then(function (data) {
            console.log(data);
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;