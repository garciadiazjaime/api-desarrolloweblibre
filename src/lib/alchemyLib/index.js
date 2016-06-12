import _ from 'lodash';
import moment from 'moment';
import config from '../../config';
import asyncLib from '../asyncLib';
import RequestLib from '../requestLib';
import QueryLib from '../queryLib';
import DbLib from '../dbLib';
import "babel-polyfill";

export default class AlchemyLib {

  getArticle() {
    return asyncLib(function* () {
      const startDateTime = moment().subtract(2, 'days').unix();
      const endDateTime = moment().unix();
      const keyword = 'javascript';
      const count = 2;
      const url = config.get('alchemy.apiUrl') + 'data/GetNews?apikey=' + config.get('alchemy.token') + '&return=enriched.url.title,enriched.url.url&start=' + startDateTime + '&end=' + endDateTime + '&q.enriched.url.cleanedTitle=' + keyword + '&q.enriched.url.enrichedTitle.docSentiment.type=positive&q.enriched.url.enrichedTitle.taxonomy.taxonomy_.label=technology%20and%20computing&count=' + count + '&outputMode=json';
      const results = yield RequestLib.get(url);
      const data = JSON.parse(results);
      if (data.status === 'OK' && _.isArray(data.result.docs) && data.result.docs.length) {
        const post = this.parseToFBPost(data.result.docs[0]);
        return post;
      }
      return data;
    }.bind(this))();
  }

  parseToFBPost(data) {
    const row = data.source.enriched.url;
    const date = moment(row.post_date).format('YYYY/MM/DD');
    return `${row.title}\n\n ${row.url}`;
  }
}
