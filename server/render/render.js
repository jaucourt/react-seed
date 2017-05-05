import fs from 'fs';
import React from 'react';
import {match, RouterContext} from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from '../../client/routes';
import {Router} from 'express';
import AsyncProps, { loadPropsOnServer } from 'async-props';

var router = Router({caseSensitive: true, strict: true});

//only read on startup
//var template = fs.readFileSync(__dirname + "/../../client/index.html", {encoding:'utf8'});

router.get('*', (req, res) => {
  if (req.url == '/favicon.ico'){
    return res.status(404).end();
  }

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      console.log("Rendering to string");
      loadPropsOnServer(renderProps, (err, asyncProps, scriptTag) => {
        res.status(200).send("<!doctype html>" + renderToString(
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>Showcase</title>
              <link rel="stylesheet" media="screen" href="/style.css" type="text/css" />
            </head>
            <body>
              <div id="app"><AsyncProps {...renderProps} {...asyncProps} /></div>
              <script src="/bundle.js"></script>
            </body>
          </html>
        ))
      })
    } else {
      res.status(404).send('Not found apparently')
    }
  });
});

module.exports = router;
