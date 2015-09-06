var cheerio = require("cheerio");
var requestSync = require("sync-request");
var request = require("request");

module.exports = {
    greenLife: function(recId) {
        var $ = cheerio.load(requestSync("GET", "https://verify.greenlifemedical.com/recommendations?rec_id=" + recId).getBody("utf8"));
        if ($(".result").length) {
            return true;
        } else {
            return false;
        }
    },
    patientIdCenter: function(recId, californiaId) {
        request.post({
            url:'http://verify.rxcbc.org/index.php', 
            form: {
                sMemberNumber: recId,
                sIDNumber: californiaId,
                submit: 'submit'
            }
        },
        function(err,response,body) { 
            var $ = cheerio.load(body);
            if ($("#lblStatus2").text() !== "NOT FOUND") {
                return true
            } else {
                return false
            }
        });
    }
};