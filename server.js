// express
// node - 集成express

let express = require('express');
let app = express();
let webpack = require('webpack');

let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js/index.js');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/api/name', (req, res) => {
  res.json({
    name: 'webpack'
  })
})

app.listen(8090);