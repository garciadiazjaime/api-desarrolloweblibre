'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _asyncLib = require('./lib/asyncLib');

var _asyncLib2 = _interopRequireDefault(_asyncLib);

var _blogLib = require('./lib/blogLib');

var _blogLib2 = _interopRequireDefault(_blogLib);

var _facebookLib = require('./lib/facebookLib');

var _facebookLib2 = _interopRequireDefault(_facebookLib);

var _alchemyLib = require('./lib/alchemyLib');

var _alchemyLib2 = _interopRequireDefault(_alchemyLib);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

function badCallHandler(res) {
  res.send('nice try');
}

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));

app.get('/', function (req, res) {
  res.send('ping');
});

app.get('/renew-token/:token', function (req, res) {
  var token = req.params ? req.params.token : null;
  if (token) {
    getLongToken(token).then(function (data) {
      res.send(Math.round(data.expires_in / 1000 / 60).toString());
    }).catch(function (error) {
      res.send(error);
    });
  } else {
    badCallHandler(res);
  }
});

app.get('/blog/post', function (req, res) {
  var token = req.query.token;
  if (token === _config2.default.get('secureToken')) {
    (function () {
      var blog = new _blogLib2.default();
      var fb = new _facebookLib2.default();
      (0, _asyncLib2.default)(regeneratorRuntime.mark(function _callee() {
        var article, results, update;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return blog.getArticle();

              case 2:
                article = _context.sent;
                _context.next = 5;
                return fb.post(article.content);

              case 5:
                results = _context.sent;
                _context.next = 8;
                return blog.updatePost(article.id);

              case 8:
                update = _context.sent;

                res.send({
                  results: results,
                  update: update
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }))();
    })();
  } else {
    badCallHandler(res);
  }
});

app.get('/alchemy/post', function (req, res) {
  var token = req.query.token;
  if (token === _config2.default.get('secureToken')) {
    (function () {
      var alchemy = new _alchemyLib2.default();
      var fb = new _facebookLib2.default();
      (0, _asyncLib2.default)(regeneratorRuntime.mark(function _callee2() {
        var article, results;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return alchemy.getArticle();

              case 2:
                article = _context2.sent;

                if (article.status) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 6;
                return fb.post(article);

              case 6:
                results = _context2.sent;

                res.send({
                  article: article,
                  results: results
                });
                _context2.next = 11;
                break;

              case 10:
                res.send(article);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }))();
    })();
  } else {
    badCallHandler(res);
  }
});

app.set('ipaddress', _config2.default.get('ip'));
app.set('port', _config2.default.get('port'));
var server = app.listen(app.get('port'), app.get('ipaddress'), function (err) {
  if (err) {
    console.log(err);
  }
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});