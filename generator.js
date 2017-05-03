var fs = require("fs");
var endpoint = process.argv[2];
var TEST_TEMPLATE = `
var supertest = require("supertest");
var should = require("should");
var config = require("./config");

// Set up server
var server = supertest.agent(config.apiUrl);

// Begin tests
describe("GET /${endpoint}/",function(){
  it("Responds with json",function(done){
    server
    .get("${endpoint}")
    .set("Authorization", config.authorization)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});`

fs.writeFile(
    __dirname + '/test/' + endpoint + '.js', TEST_TEMPLATE, (err) => {
    if(err) throw err;
    console.log('File: ' + endpoint + ' was created');
});
