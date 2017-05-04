
var supertest = require("supertest");
var should = require("should");
var config = require("./config");

// Set up server
var server = supertest.agent(config.apiUrl);

// Begin tests
describe("GET //",function(){
  it("Responds with json",function(done){
    server
    .get("")
    .set("Authorization", config.authorization)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});