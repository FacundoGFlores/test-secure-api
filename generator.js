if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' endpoint_name');
  process.exit(1);
}

var testWriter = require("./src/writeTest");
var option = process.argv[2];
var listExpr = /list=true/;

if (listExpr.test(option)) {
  var endpointList = require("./src/content");
  endpointList.forEach(function(item) {
    testWriter(item);
  })
} else {
  testWriter(option);
}




