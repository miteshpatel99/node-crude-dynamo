const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = Schema({
  hallName: String,
  start: String,
  end: String,
  rent: String,
  users: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

module.exports = mongoose.model('Booking', BookingSchema)
