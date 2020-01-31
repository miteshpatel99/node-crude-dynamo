var AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000'
})

const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = docClient
