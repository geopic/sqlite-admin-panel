/**
 * src/app.ts
 * Central server file, uses Express.
 * © George Pickering 2020, https://github.com/geopic
 */

import express from 'express';
import http from 'http';
import path from 'path';
import props from '@/common/props';
import utils from '@/common/utils';
import config from 'config.json';

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/'
  );
  res.setHeader('Access-Control-Allow-Methods', [
    'GET, PUT, POST, DELETE, HEAD'
  ]);

  // Block requests to API (served info about databases) from outside
  if (req.header('Referer') || req.route === '/') {
    next();
  } else {
    res.sendStatus(403).end();
  }
});

// Password protection using password from config file
app.route('/verifyuser').post((req, res) => {
  res.send({ result: req.body === config.site.password }).end();
});

app
  .route('/database/:dbname?')
  .get(async (req, res) => {
    if (req.params.dbname) {
      // Send information on single database
      res
        .send(await utils.databases.fetchSingleDb(req.params.dbname))
        .status(200)
        .end();
    } else {
      // Send information on all databases
      res
        .send(await utils.databases.fetchAllDbFiles())
        .status(200)
        .end();
    }
  })
  .post(async (req, res) => {
    await utils.databases.createNewDatabase(req.params.dbname);
    res.status(200).end();
  })
  .delete(async (req, res) => {
    await utils.databases.deleteDatabase(req.params.dbname);
    res.status(200).end();
  });

const server = http.createServer(app).listen(props.site.serverPort);

server.on('error', (err) => {
  throw err;
});

server.on('listening', () => {
  console.log(
    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}: Server listening on port ${
      props.site.serverPort
    }.`
  );
});
