var express = require('express');
var router = express.Router();
var db = require('../lib/pgDb.js');
var mainService = require('./main_service.js');

var g_idx = 0;


//네이버로그인
router.get('/naver_login_success', function(req, res){
    console.log("#333333333333333")
    console.log(req);
    console.log(req.url);
});


//방명록리스트
router.get('/guestList', function(req, res){
    console.log("0000000000000000000")
    mainService.selectGuestBookList()
        .then(function (data){
            console.log(data);
            g_idx = data[Object.keys(data).length-1].g_idx;
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
});

//방명록리스트더보기
router.get('/guestListMore', function(req, res){
     g_idx = (req.url).split('=')[1];
         console.log(req.session)
     mainService.selectGuestBookListMore(g_idx)
        .then(function (data){
            res.json(data);
        })
        .catch(function (err){
            res.json(err);
        });
});

//게스트북
router.post('/guestSubmit', function(req, res){
    //console.log("게스트등록");
  var member = req.body;

  mainService.insertGuestSubmit(member)
    .then(function(data){
        res.json(data);
    })
    .catch(function(error){
      //console.log(error);
        res.send(error);
    });

});



module.exports = router;