import request from 'request';
import _ from 'lodash';

export default class RequestLib {

  static get(url, data, jsonRequest) {
    const params = {
      method: 'GET',
    };
    if (_.isString(url) && url) {
      params.url = url;
    }
    if (_.isObject(data) && !_.isEmpty(data)) {
      params.qs = data;
    }
    if (jsonRequest) {
      params.json = true;
    }
    return new Promise((resolve, reject) => {
      request(params, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(response.body);
        }
      });
    });
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: 'POST',
        json: data,
      }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(body)
        } else {
          reject(error || body);
        }
      });
    });
  }
}
