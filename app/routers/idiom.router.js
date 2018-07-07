var express = require('express');
var router = express.Router();
var callPythonService = require('../services/call-python');
console.log(__dirname)
router.route("/search")
    .post(function (req, res) {
        console.log(req.body);
        var args = req.body.args;
        callPythonService.call_python('idiom/search.py', args).then(function (result) {
            res.json({
                status: 0,
                message: "success",
                data: result
            })
        }, function () {
            res.json({
                status: -1,
                message: "failed",
                data: 'something wrong'
            })
        })
    });



module.exports = router;