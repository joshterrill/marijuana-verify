const request = require('request');
const cheerio = require('cheerio');
const zipObject = require('lodash.zipobject');

const url = 'https://verify.greenlifemedical.com/recommendations?rec_id=';
const keys = ['initials', 'issued', 'expires', 'doctor'];

module.exports = function greenlife(credentials) {
    return new Promise((resolve, reject) => {
        request({ uri: url + credentials.recId }, (err, res, body) => {
            if (err) {
                return reject(err);
            }

            let card = undefined;
            
            try {
                card = parseContent(body);
            } catch (e) {
                return reject(e);
            }
            
            resolve(card);
        });
    });
};

/**
 * Parses HTML content from GreenLife Medical Systems
 * @param  {String} body HTML markup
 * @return {Object}      object with isValid property and if valid,
 *                         other relevant properties
 */
function parseContent(body) {
    const $ = cheerio.load(body);
    const notice = $('#flash_notice')[0];
    let result;

    if (notice && $(notice).text().trim() === 'No recommendation found') {
        result = { isValid: false };
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
            .map(function (val) {
                return val.split(': ')[1];
            });

        result = zipObject(keys, result);
        result.isValid = true;
    }

    return result;
}
