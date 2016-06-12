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

var AlchemyLib = function () {
  function AlchemyLib() {
    _classCallCheck(this, AlchemyLib);
  }

  _createClass(AlchemyLib, [{
    key: 'getArticle',
    value: function getArticle() {
      return (0, _asyncLib2.default)(regeneratorRuntime.mark(function _callee() {
        var startDateTime, endDateTime, keyword, count, url, results, data, post;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                startDateTime = (0, _moment2.default)().subtract(2, 'days').unix();
                endDateTime = (0, _moment2.default)().unix();
                keyword = 'javascript';
                count = 2;
                url = _config2.default.get('alchemy.apiUrl') + 'data/GetNews?apikey=' + _config2.default.get('alchemy.token') + '&return=enriched.url.title,enriched.url.url&start=' + startDateTime + '&end=' + endDateTime + '&q.enriched.url.cleanedTitle=' + keyword + '&q.enriched.url.enrichedTitle.docSentiment.type=positive&q.enriched.url.enrichedTitle.taxonomy.taxonomy_.label=technology%20and%20computing&count=' + count + '&outputMode=json';
                _context.next = 7;
                return _requestLib2.default.get(url);

              case 7:
                results = _context.sent;
                data = JSON.parse(results);

                if (!(data.status === 'OK' && _lodash2.default.isArray(data.result.docs) && data.result.docs.length)) {
                  _context.next = 12;
                  break;
                }

                post = this.parseToFBPost(data.result.docs[0]);
                return _context.abrupt('return', post);

              case 12:
                return _context.abrupt('return', data);

              case 13:
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
      var row = data.source.enriched.url;
      var date = (0, _moment2.default)(row.post_date).format('YYYY/MM/DD');
      return row.title + '\n\n ' + row.url;
    }
  }]);

  return AlchemyLib;
}();

exports.default = AlchemyLib;