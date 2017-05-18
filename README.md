# TEST-SECURE-API

A project for testing secured RestAPIs.

## Usage
0. Set up `API_URL` in `config.js`. (Maybe you need to add an authorization header)
1. Generate test: `npm run newtest {name_of_endpoint}`
2. Run all tests: `npm test`

Example:

* `npm run newtest posts`. Creates a `posts.js` file inside `test` folder
* `npm test`. Run `posts` test.

## Generating tests from a list of endpoints

1. Fill the `list.test` file with all the endpoints you want to create.
2. Run the following `npm run newtest list=true`
3. `npm test` will run all the test created.
