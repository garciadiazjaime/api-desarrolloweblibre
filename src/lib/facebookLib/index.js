import _ from 'lodash';
import moment from 'moment';
import config from '../../config';
import asyncLib from '../asyncLib';
import RequestLib from '../requestLib';
import QueryLib from '../queryLib';
import DbLib from '../dbLib';
import "babel-polyfill";

export default class FacebookLib {

  getLongToken(shortToken) {
    return asyncLib(function* () {
      const data = {
         grant_type: 'fb_exchange_token',
         client_id: config.get('facebook.appId'),
         client_secret: config.get('facebook.appSecret'),
         fb_exchange_token: shortToken,
      };
      const url = config.get('facebook.apiUrl') + 'oauth/access_token';
      const results = yield RequestLib.get(url, data);
      config.set('facebook.shortToken', shortToken);
      config.set('facebook.longToken', results.access_token);
      return results;
    })();
  };

  post(data) {
    return asyncLib(function* () {
      const message = {
        access_token: config.get('facebook.longToken'),
        message: data,
      }
      const url = config.get('facebook.apiUrl') + 'me/feed';
      const results = yield RequestLib.post(url, message);
      return results;
    })();
  }

  prepareFBPost(data) {
    let response = false;
    if(_.isArray(data) && data.length === 1) {
      const values = data[0];
      const date = moment(values.post_date).format('YYYY/MM/DD');
      response = `${values.post_title}.\n\n ${values.content}... \nhttp://www.desarrolloweblibre.com/${date}/${values.post_name}`;
    }
    return response;
  }
}
