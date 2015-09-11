'use strict';

var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');

var url = 'http://verify.rxcbc.org/index.php';

module.exports = function patientIdCenter(credentials, callback) {
  if (callback && typeof callback !== 'function') {
    callback = null;
  }

  function verify(resolve, reject) {
    function requestComplete(err, res, body) {
      if (err) {
        return reject(err);
      }

      try {
        var card = parseContent(body);
      } catch (e) {
        return reject(e);
      }

      if (callback) {
        callback(null, card);
      }
      resolve(card);
    }

    request.post({
      url: url,
      form: {
          sMemberNumber: credentials.recId,
          sIDNumber: credentials.californiaId,
          submit: 'submit'
      }
    }, requestComplete);
  }

  return new Promise(verify);
};

/**
 * Parses HTML content from Patient ID Center
 * @param  {String} body HTML markup
 * @return {Object}      object with isValid property
 */
function parseContent(body) {
  var $ = cheerio.load(body);
  var result = {};

  if ($("#lblStatus2").text() === "NOT FOUND") {
    result.isValid = false;
  } else {
    result.isValid = true;
  }

  return result;
}
