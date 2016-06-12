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

var BlogLib = function () {
  function BlogLib() {
    _classCallCheck(this, BlogLib);

    this.db = new _dbLib2.default();
  }

  _createClass(BlogLib, [{
    key: 'getArticle',
    value: function getArticle() {
      return (0, _asyncLib2.default)(regeneratorRuntime.mark(function _callee() {
        var query, data, row;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = _queryLib2.default.contentToPost();
                _context.next = 3;
                return this.db.executeQuery(query);

              case 3:
                data = _context.sent;

                if (!(_lodash2.default.isArray(data) && data.length === 1)) {
                  _context.next = 7;
                  break;
                }

                row = data[0];
                return _context.abrupt('return', {
                  id: row.id,
                  content: this.parseToFBPost(row)
                });

              case 7:
                return _context.abrupt('return', false);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }).bind(this))();
    }
  }, {
    key: 'parseToFBPost',
    value: function parseToFBPost(data) {
      var date = (0, _moment2.default)(data.post_date).format('YYYY/MM/DD');
      return data.post_title + '.\n\n ' + data.content + '... \nhttp://www.desarrolloweblibre.com/' + date + '/' + data.post_name;
    }
  }, {
    key: 'updatePost',
    value: function updatePost(postId) {
      return (0, _asyncLib2.default)(regeneratorRuntime.mark(function _callee2() {
        var query, results;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = _queryLib2.default.updatePost(postId);
                _context2.next = 3;
                return this.db.insertQuery(query.sql, query.values);

              case 3:
                results = _context2.sent;
                return _context2.abrupt('return', results);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }).bind(this))();
    }
  }]);

  return BlogLib;
}();

exports.default = BlogLib;