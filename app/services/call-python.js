var Q = require("q");
var PythonShell = require('python-shell');

var fs = require('fs');
var path = require('path');
var PythonShellOptions = require('../../assets/python-shell-config.json');
PythonShellOptions['pythonPath'] = path.join(__dirname, PythonShellOptions['pythonPath']);
PythonShellOptions['scriptPath'] = path.join(__dirname, PythonShellOptions['scriptPath']);

console.log('PythonShellOptions', PythonShellOptions);
module.exports = {
    call_python: function (relativeScriptPath, args) {
        var deferred = Q.defer();
        PythonShellOptions["args"] = args;
        var pyshell = new PythonShell(path.join(relativeScriptPath), PythonShellOptions);
        pyshell.on('message', function (message) {
            console.log(message)
            deferred.resolve(eval(message));
        });
        return deferred.promise;

    }
};