'use strict';

var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var zipObject = require('lodash.zipobject');

var url = 'https://verify.greenlifemedical.com/recommendations?rec_id=';
var keys = ['initials', 'issued', 'expires', 'doctor'];

module.exports = function greenlife(credentials, callback) {
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

    request({uri: url + credentials.recId}, requestComplete);
  }

  return new Promise(verify);
};

/**
 * Parses HTML content from GreenLife Medical Systems
 * @param  {String} body HTML markup
 * @return {Object}      object with isValid property and if valid,
 *                         other relevant properties
 */
function parseContent(body) {
  var $ = cheerio.load(body);
  var notice = $('#flash_notice')[0];
  var result;

  if (notice && $(notice).text().trim() === 'No recommendation found') {
    result = {isValid: false};
  } else {
    /* Below we're parsing the content of $('#container .result').html()
     * Example:
     *
     *    <div class="result">
     *        Recommendation Information <br>
     *
     *        Recommendation 01234567890987 is VALID<br>
     *        Patient Initials: A.B.C<br>
     *        Issue Date: 2015-01-01<br>
     *        Valid Through: 2016-01-01<br>
     *        Doctors Name: JOHN A SMITH, M.D.<br>
     *
     *    </div>
     */

    result = $('#container .result')
        .text()
        .trim()
        .split('\n')
        .filter(function (val) {
          // remove any falsy values
          return val.trim();
        })
        .slice(2)
        .map(function(val) {
          return val.split(': ')[1];
        });

    result = zipObject(keys, result);
    result.isValid = true;
  }

  return result;
}
