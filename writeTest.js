var fs = require("fs");
var endpoint_template;

var TEST_TEMPLATE = `
var supertest = require("supertest");
var should = require("should");
var config = require("./config");

// Set up server
var server = supertest.agent(config.apiUrl);

// Begin tests
describe("GET /${endpoint_template}/",function(){
  it("Responds with json",function(done){
    server
    .get("${endpoint_template}")
    .set("Authorization", config.authorization)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});`

var writeTest = function (endpoint) {
  endpoint_template = endpoint;
  fs.writeFile(
      __dirname + '/test/' + endpoint + '.js', TEST_TEMPLATE, (err) => {
      if(err) throw err;
      console.log('File: ' + endpoint + ' was created');
  });
}

module.exports = writeTest;
