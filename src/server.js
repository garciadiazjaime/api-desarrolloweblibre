import express from 'express';
import bodyParser from 'body-parser'
import asyncLib from './lib/asyncLib';
import BlogLib from './lib/blogLib';
import FacebookLib from './lib/facebookLib';
import AlchemyLib from './lib/alchemyLib';
import config from './config';
import "babel-polyfill";

const app = express()

function badCallHandler(res) {
  res.send('nice try');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('ping')
});

app.get('/renew-token/:token', (req, res) => {
  const token = req.params ? req.params.token : null;
  if (token) {
    getLongToken(token)
      .then((data) => {
        res.send((Math.round(data.expires_in / 1000 / 60)).toString());
      })
      .catch(function(error) {
        res.send(error);
      });
  } else {
    badCallHandler(res);
  }
});

app.get('/blog/post', (req, res) => {
  const token = req.query.token;
  if (token === config.get('secureToken')) {
    const blog = new BlogLib();
    const fb = new FacebookLib();
    asyncLib(function* () {
      const article = yield blog.getArticle();
      const results = yield fb.post(article.content);
      const update = yield blog.updatePost(article.id);
      res.send({
        results,
        update,
      });
    })();
  } else {
    badCallHandler(res);
  }
});

app.get('/alchemy/post', (req, res) => {
  const token = req.query.token;
  if (token === config.get('secureToken')) {
    const alchemy = new AlchemyLib();
    const fb = new FacebookLib();
    asyncLib(function* () {
      const article = yield alchemy.getArticle();
      if (!article.status) {
        const results = yield fb.post(article);
        res.send({
          article,
          results,
        });
      } else {
        res.send(article);
      }
    })();
  } else {
    badCallHandler(res);
  }
});

app.set('ipaddress', config.get('ip'));
app.set('port', config.get('port'));
const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
  if (err) {
    console.log(err);
  }
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
