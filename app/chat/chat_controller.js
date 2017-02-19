var express = require('express');
var router = express.Router();

var db = require('../lib/pgDb.js');
var chatService = require('./chat_service.js');


module.exports = router;