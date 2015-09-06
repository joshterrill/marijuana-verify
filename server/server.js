var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require("../index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.route('/greenLife/:recId')
    .get(function(req, res) {
        var recId = req.params.recId;
        var verify = api.greenLife(recId);
        if (verify) {
            res.json({provider: "GreenLife Medical", recId: recId, verified: true})
        } else {
            res.json({provider: "GreenLife Medical", recId: recId, verified: false})
        }
    });

router.route('/patientIdCenter/:recId/:californiaId')
    .get(function(req, res) {
        var recId = req.params.recId;
        var californiaId = req.params.californiaId;
        var verify = api.patientIdCenter(recId, californiaId);
        if (verify) {
            res.json({provider: "Patiend ID Center", recId: recId, californiaId: californiaId, verified: true})
        } else {
            res.json({provider: "Patiend ID Center", recId: recId, californiaId: californiaId, verified: false})
        }
    });

app.use('/api', router);

app.listen(port);
console.log('Server running on port ' + port);