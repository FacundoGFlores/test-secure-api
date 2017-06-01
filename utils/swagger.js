var path = require('path');
var fs = require('fs');
var fetch = require('node-fetch');
var swaggerConfig = require('./swagger-config');

function makeSchema(properties) {
  var schema = {};
  Object.keys(properties).forEach(function(property) {
    schema[property] = properties[property].type;
  });
  return schema;
}

function getSchema(body, definition) {
  return makeSchema(body.definitions[definition].properties)
}

function extractDefinitionName(ref) {
  // asume all $ref have the form #/definitions/definitionName
  return ref.split('/')[2];
}

function getDefinitionName(apiEndPoint, httpMethod, httpStatusCode) {
  return fetch(swaggerConfig.URL)
    .then(function(res) {
      return res.json()
    })
    .then(function(body) {
      return extractDefinitionName(body.paths[apiEndPoint][httpMethod]['responses'][httpStatusCode]['schema']['$ref']);
    })
}

function writeSchema(definition, schema) {
  if(!definition.length) {
    return;
  }
  var pathname = path.join(path.resolve(__dirname, '..'), 'test', 'schemas', definition + '.json');
  if (!fs.existsSync(pathname)) {
    fs.writeFile(
          pathname, JSON.stringify(schema), (err) => {
          if(err) throw err;
          console.log('Schema: ' + definition + ' was created');
      });
  }
}

function writeAllSchemas() {
  return fetch(swaggerConfig.URL)
    .then(function(res) {
      return res.json()
    })
    .then(function(body) {
      return Object.keys(body.definitions).forEach(function(definition) {
        var schema = getSchema(body, definition);
        writeSchema(definition, schema);
      })
    });
}

module.exports = {
  writeAllSchemas
}
