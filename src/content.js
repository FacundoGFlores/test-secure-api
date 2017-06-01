var fs = require("fs");
var path = require("path");

var content;

content = fs.readFileSync(path.resolve(__dirname, '..', 'endpoints')).toString().split('\n');

module.exports = content;
