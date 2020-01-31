const Booking = require('../models/booking.model')
const docClient = require('../../config/dynamo')
// Create and Save a new Note
exports.create = (req, res) => {
  console.log('request body', req.body)
  // Validate request
  if (!req.body.id) {
    return res.status(400).send({
      message: 'id is required'
    })
  }
  var params = {
    TableName: 'bookings',
    Item: req.body,
    ReturnValues: 'ALL_OLD'
  }
  docClient.put(params, function (err, data) {
    if (err) {
      res.send(err)
    } else {
      return res.status(200).send({
        message: 'Item added successfully'
      })
      // res.send(data)
    }
  })
}

exports.findAll = (req, res) => {
  var params = {
    TableName: 'bookings'
  }
  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(err) // an error occurred
    } else {
      console.log(data.Items)
      res.send(data.Items)
    }
  })
}
// Find a single note with a noteId
exports.findOne = (req, res) => {
  var params = {
    TableName: 'bookings',
    Key: { // a map of attribute name to AttributeValue for all primary key attributes
      id: req.params.bookingId
    }
  }
  docClient.get(params, function (err, data) {
    if (err) {
      console.log(err) // an error occurred
      res.send(err)
    } else {
      if (data.Item) res.send(data.Item)
      return res.status(404).send({
        message: 'User not found with id ' + req.params.bookingId
      })
    }
  })
}
// Update a booking with booking id
exports.update = (req, res) => {
  var params = {
    TableName: 'bookings',
    Key: {
      id: parseInt(req.params.bookingId)
    },
    UpdateExpression: 'SET #h= :h, #s= :s, #e= :e, #r=:r',
    ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
      '#h': 'hallName',
      '#s': 'start',
      '#e': 'end',
      '#r': 'rent'
    },
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':h': req.body.hallName,
      ':s': req.body.start,
      ':e': req.body.end,
      ':r': req.body.rent
    },
    ReturnValues: 'ALL_NEW' // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)
  }
  docClient.update(params, function (err, data) {
    if (err) res.send(err) // an error occurred
    else res.send(data) // successful response
  })
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  var params = {
    TableName: 'bookings',
    Key: {
      id: parseInt(req.params.bookingId)
    },
    ReturnValues: 'ALL_OLD' // optional (NONE | ALL_OLD)

  }
  docClient.delete(params, function (err, data) {
    if (err) res.send(err) // an error occurred
    else res.send(data) // successful response
  })
}
