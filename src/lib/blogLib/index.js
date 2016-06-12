import _ from 'lodash';
import moment from 'moment';
import config from '../../config';
import asyncLib from '../asyncLib';
import RequestLib from '../requestLib';
import QueryLib from '../queryLib';
import DbLib from '../dbLib';
import "babel-polyfill";

export default class BlogLib {

  constructor() {
    this.db = new DbLib();
  }

  getArticle() {
    return asyncLib(function* () {
      const query = QueryLib.contentToPost();
      const data = yield this.db.executeQuery(query);
      if(_.isArray(data) && data.length === 1) {
        const row = data[0];
        return {
          id: row.id,
          content: this.parseToFBPost(row)
        };
      }
      return false;
    }.bind(this))();
  }

  parseToFBPost(data) {
    const date = moment(data.post_date).format('YYYY/MM/DD');
    return `${data.post_title}.\n\n ${data.content}... \nhttp://www.desarrolloweblibre.com/${date}/${data.post_name}`;
  }

  updatePost(postId) {
    return asyncLib(function* () {
      const query = QueryLib.updatePost(postId);
      const results = yield this.db.insertQuery(query.sql, query.values);
      return results;
    }.bind(this))();
  }
}
