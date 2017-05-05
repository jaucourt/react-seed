require('babel-core/register')({
  presets: ['babel-preset-es2015', 'babel-preset-react', "transform-decorators-legacy", "transform-class-properties"].map(require.resolve)
});

const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 9000;

app.use(cors());

// Return static assets
app.use(express.static('./public'));

// Render the app server side
app.use('/', require('./render/render'));

app.listen(port);

console.log(`App started goto - http://0.0.0.0:${port}`);
