var fs = require("fs");
var path = require("path");

var endpoint_template;

String.prototype.replaceAll = function(search, replace)
{
    if (replace === undefined) {
        return this.toString();
    }
    return this.replace(new RegExp(search, 'g'), replace);
};

var TEST_TEMPLATE = `var supertest = require('supertest');
var config = require('./config');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-json-schema'));

var schema = require('./schemas/KeyName.json');

// Set up server
var server = supertest.agent(config.apiUrl);

// Begin tests
describe("GET /{endpoint_template}/",function(){
  this.timeout(30000);
  it('Responds with valid json schema',function(done){
    server
    .get("{endpoint_template}")
    .set('Authorization', config.authorization)
    .expect('Content-type',/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.jsonSchema(schema);
      done();
    });
  });
});`

var writeTest = function (endpoint) {
  if(!endpoint.length) {
    return;
  }
  var template = TEST_TEMPLATE.replaceAll('{endpoint_template}', endpoint);
  var pathname = path.join(__dirname, 'test', endpoint + '.spec.js');
  if (!fs.existsSync(pathname)) {
    fs.writeFile(
          pathname, template, (err) => {
          if(err) throw err;
          console.log('File: ' + endpoint + ' was created');
      });
  }
}

module.exports = writeTest;
