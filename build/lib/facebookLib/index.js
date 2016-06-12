'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _asyncLib = require('../asyncLib');

var _asyncLib2 = _interopRequireDefault(_asyncLib);

var _requestLib = require('../requestLib');

var _requestLib2 = _interopRequireDefault(_requestLib);

var _queryLib = require('../queryLib');

var _queryLib2 = _interopRequireDefault(_queryLib);

var _dbLib = require('../dbLib');

var _dbLib2 = _interopRequireDefault(_dbLib);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookLib = function () {
  function FacebookLib() {
    _classCallCheck(this, FacebookLib);
  }

  _createClass(FacebookLib, [{
    key: 'getLongToken',
    value: function getLongToken(shortToken) {
      return (0, _asyncLib2.default)(regeneratorRuntime.mark(function _callee() {
        var data, url, results;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = {
                  grant_type: 'fb_exchange_token',
                  client_id: _config2.default.get('facebook.appId'),
                  client_secret: _config2.default.get('facebook.appSecret'),
                  fb_exchange_token: shortToken
                };
                url = _config2.default.get('facebook.apiUrl') + 'oauth/access_token';
                _context.next = 4;
                return _requestLib2.default.get(url, data);

              case 4:
                results = _context.sent;

                _config2.default.set('facebook.shortToken', shortToken);
                _config2.default.set('facebook.longToken', results.access_token);
                return _context.abrupt('return', results);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }))();
    }
  }, {
    key: 'post',
    value: function post(data) {
      return (0, _asyncLib2.default)(regeneratorRuntime.mark(function _callee2() {
        var message, url, results;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                message = {
                  access_token: _config2.default.get('facebook.longToken'),
                  message: data
                };
                url = _config2.default.get('facebook.apiUrl') + 'me/feed';
                _context2.next = 4;
                return _requestLib2.default.post(url, message);

              case 4:
                results = _context2.sent;
                return _context2.abrupt('return', results);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }))();
    }
  }, {
    key: 'prepareFBPost',
    value: function prepareFBPost(data) {
      var response = false;
      if (_lodash2.default.isArray(data) && data.length === 1) {
        var values = data[0];
        var date = (0, _moment2.default)(values.post_date).format('YYYY/MM/DD');
        response = values.post_title + '.\n\n ' + values.content + '... \nhttp://www.desarrolloweblibre.com/' + date + '/' + values.post_name;
      }
      return response;
    }
  }]);

  return FacebookLib;
}();

exports.default = FacebookLib;