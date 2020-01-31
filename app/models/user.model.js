const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchemaa = Schema({   
    name: String,
    email: String,
    mobile: String,
    city: String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchemaa );