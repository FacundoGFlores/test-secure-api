var fs = require("fs");
var content;

content = fs.readFileSync(__dirname + '/list.test').toString().split('\n');

module.exports = content;
