var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require("../index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.route('/:provider/:recId')
    .get(function(req, res) {
        var provider = req.params.provider;
        var recId = req.params.recId;
        if (provider === "greenLife") {
            var verify = api.greenLife(recId);
            if (verify) {
                res.json({provider: provider, recId: recId, verified: true})
            } else {
                res.json({provider: provider, recId: recId, verified: false})
            }
        } else {
            res.json({error: "No provider found."})
        }
    });

app.use('/api', router);

app.listen(port);
console.log('Server running on port ' + port);