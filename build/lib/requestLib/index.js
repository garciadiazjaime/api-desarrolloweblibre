'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestLib = function () {
  function RequestLib() {
    _classCallCheck(this, RequestLib);
  }

  _createClass(RequestLib, null, [{
    key: 'get',
    value: function get(url, data, jsonRequest) {
      var params = {
        method: 'GET'
      };
      if (_lodash2.default.isString(url) && url) {
        params.url = url;
      }
      if (_lodash2.default.isObject(data) && !_lodash2.default.isEmpty(data)) {
        params.qs = data;
      }
      if (jsonRequest) {
        params.json = true;
      }
      return new Promise(function (resolve, reject) {
        (0, _request2.default)(params, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(response.body);
          }
        });
      });
    }
  }, {
    key: 'post',
    value: function post(url, data) {
      return new Promise(function (resolve, reject) {
        (0, _request2.default)({
          url: url,
          method: 'POST',
          json: data
        }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(error || body);
          }
        });
      });
    }
  }]);

  return RequestLib;
}();

exports.default = RequestLib;