var supertest = require("supertest");
var should = require("should");
var config = require("../config");
var server = supertest.agent(config.authentication.apiUrl);

describe("POST /connect/token", function(){
  it("Responds with json", function(done){
    server
    .post("connect/token")
    .set("Authorization", config.authentication.authorization)
    .send({
        grant_type: config.authentication.grantType,
        username: config.authentication.username,
        password: config.authentication.password,
        scope: config.authentication.scope
    })
    .type('form')
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err,res){
        res.status.should.equal(200);
        done();
    });
  });
});
