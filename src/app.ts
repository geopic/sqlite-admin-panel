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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/'
  );
  res.setHeader('Access-Control-Allow-Methods', [
    'PUT, POST, PATCH, DELETE, GET'
  ]);
  next();
});

app
  .route('/db/:dbname?')
  .get(async (req, res) => {
    res
      .send(await utils.databases.fetchAllFileNames())
      .status(200)
      .end();
  })
  .post(async (req, res) => {
    console.log(req.params);
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
