var cheerio = require("cheerio");
var request = require("sync-request");

module.exports = {
    greenLife: function(recId) {
        var $ = cheerio.load(request("GET", "https://verify.greenlifemedical.com/recommendations?rec_id=" + recId).getBody("utf8"));
        if ($(".result").length) {
            return true;
        } else {
            return false;
        }
    }
};