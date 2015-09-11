'use strict';

var fs = require('fs');
var path = require('path');

fs.readdirSync(path.resolve(__dirname, './providers'))
  .forEach(function (provider) {
    provider = provider.split('.')[0];
    module.exports[provider] = require('./providers/' + provider);
  });
