// NOTE: This file is only used for local development.
// For Vercel deployment, use Next.js API routes in pages/api.
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

require('dotenv').config();

const apiRoutes = require('./server/routes/apiRoutes.js');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

  server.use('/api', apiRoutes);

  server.get('/search', (req, res) => {
    return app.render(req, res, '/search', req.query);
  });

  server.get('/artist/:id', (req, res) => {
    return app.render(req, res, '/artist', { id: req.params.id });
  });

  server.get('/album/:id', (req, res) => {
    return app.render(req, res, '/album', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});
