const User = require('../models/user.model');
const Booking = require('../models/booking.model')

// Create and Save a new Note
exports.create = (req, res) => {
    console.log('request body', req.body)
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email is required"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city       
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.findAll = (req, res) => {   
    User.find()
    .populate('Booking')
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}
// Retrieve and return all notes from the database.
// exports.findAll = (req, res) => {

//     User.
//     find().
//     populate({
//       path: 'booking'
//       ///match: { _id: 'userId'}
//     }).
//     exec(function (err, booking) {
//     if (err) return handleError(err);
//     res.send(booking)
//     // prints "The author is Ian Fleming"
//   })

//     // User.find()
//     // .populate('Booking')
//     // .then(users => {
//     //     res.send(users);
//     // }).catch(err => {
//     //     res.status(500).send({
//     //         message: err.message || "Some error occurred while retrieving notes."
//     //     });
//     // });
// };
// Find a single note with a noteId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};