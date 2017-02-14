var express = require('express');
var router = express.Router();
var db = require('../lib/pgDb.js');
var mainService = require('./main_service.js');

var g_idx = 0;


//네이버로그인

var client_id = 'E9pMRy_OGTUOp3FORXZ3';
var client_secret = 'D8zx4ZgXYr';
var state = "RANDOM_STATE";
var redirectURI = encodeURI("http://meringk.com/naver_login_success_page.html");
var api_url = "";


app.get('/naverlogin', function (req, res) {
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
 });

router.get('/naver_login_success', function(req, res){
    console.log(req.query)
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;


     console.log("api_urlapi_urlapi_urlapi_url");
     console.log(api_url);


    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
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