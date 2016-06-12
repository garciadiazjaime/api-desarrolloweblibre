'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryLib = function () {
  function QueryLib() {
    _classCallCheck(this, QueryLib);
  }

  _createClass(QueryLib, null, [{
    key: 'contentToPost',
    value: function contentToPost() {
      return 'select\n        id,\n        post_title,\n        post_date,\n        post_name,\n        SUBSTRING(post_content, 1, 140) as content\n      from wp_posts wp\n      where id not in (select post_id from marketing)\n      order by post_date\n      limit 1;';
    }
  }, {
    key: 'updatePost',
    value: function updatePost(postId) {
      return {
        sql: 'insert into marketing set ?',
        values: {
          network: 'FACEBOOK',
          post_id: postId
        }
      };
    }
  }]);

  return QueryLib;
}();

exports.default = QueryLib;