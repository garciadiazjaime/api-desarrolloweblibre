'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DbLib = function () {
  function DbLib() {
    _classCallCheck(this, DbLib);

    this.connection = _mysql2.default.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'blog'
    });
    this.isConnectionOption = false;
  }

  _createClass(DbLib, [{
    key: 'openConnection',
    value: function openConnection() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.isConnectionOption) {
          _this.connection.connect();
          _this.isConnectionOption = true;
        }
        resolve();
      });
    }
  }, {
    key: 'executeQuery',
    value: function executeQuery(sql) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.openConnection().then(function () {
          _this2.connection.query(sql, function (err, rows, fields) {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
            // this.closeConnection();
          });
        });
      });
    }
  }, {
    key: 'insertQuery',
    value: function insertQuery(sql, data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.openConnection().then(function () {
          _this3.connection.query(sql, data, function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result.insertId);
            }
            // this.closeConnection();
          });
        });
      });
    }
  }, {
    key: 'closeConnection',
    value: function closeConnection() {
      this.connection.end();
    }
  }]);

  return DbLib;
}();

exports.default = DbLib;