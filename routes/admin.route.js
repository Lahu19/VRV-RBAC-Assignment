// const User = require('../models/user.model');
// const router = require('express').Router();
// const mongoose = require('mongoose');
// const { roles } = require('../utils/constants');

// router.get('/users', async (req, res, next) => {
//   try {
//     const users = await User.find();
//     // res.send(users);
//     res.render('manage-users', { users });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/user/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       req.flash('error', 'Invalid id');
//       res.redirect('/admin/users');
//       return;
//     }
//     const person = await User.findById(id);
//     res.render('profile', { person });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/update-role', async (req, res, next) => {
//   try {
//     const { id, role } = req.body;

//     // Checking for id and roles in req.body
//     if (!id || !role) {
//       req.flash('error', 'Invalid request');
//       return res.redirect('back');
//     }

//     // Check for valid mongoose objectID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       req.flash('error', 'Invalid id');
//       return res.redirect('back');
//     }

//     // Check for Valid role
//     const rolesArray = Object.values(roles);
//     if (!rolesArray.includes(role)) {
//       req.flash('error', 'Invalid role');
//       return res.redirect('back');
//     }

//     // Admin cannot remove himself/herself as an admin
//     if (req.user.id === id) {
//       req.flash(
//         'error',
//         'Admins cannot remove themselves from Admin, ask another admin.'
//       );
//       return res.redirect('back');
//     }

//     // Finally update the user
//     const user = await User.findByIdAndUpdate(
//       id,
//       { role },
//       { new: true, runValidators: true }
//     );

//     req.flash('info', `updated role for ${user.email} to ${user.role}`);
//     res.redirect('back');
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

const User = require('../models/user.model'); // User model for database operations
const router = require('express').Router(); // Router to define routes
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const { roles } = require('../utils/constants'); // Predefined roles from constants

// API Route to get all users
router.get('/users', async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    // Render the 'manage-users' view with the users' data
    res.render('manage-users', { users });
  } catch (error) {
    // Pass any error to the next middleware
    next(error);
  }
});

// API Route to get a single user's profile by their ID
router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the user ID from the route parameters

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id'); // Flash an error message if ID is invalid
      res.redirect('/admin/users'); // Redirect back to the users page
      return;
    }

    // Find the user by ID in the database
    const person = await User.findById(id);
    // Render the 'profile' view with the user's data
    res.render('profile', { person });
  } catch (error) {
    // Pass any error to the next middleware
    next(error);
  }
});

// API Route to update a user's role
router.post('/update-role', async (req, res, next) => {
  try {
    const { id, role } = req.body; // Extract user ID and role from the request body

    // Check if both ID and role are provided in the request
    if (!id || !role) {
      req.flash('error', 'Invalid request'); // Flash an error message for invalid request
      return res.redirect('back'); // Redirect back to the previous page
    }

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id'); // Flash an error message if ID is invalid
      return res.redirect('back'); // Redirect back to the previous page
    }

    // Validate if the provided role is valid
    const rolesArray = Object.values(roles); // Get an array of valid roles
    if (!rolesArray.includes(role)) {
      req.flash('error', 'Invalid role'); // Flash an error message for invalid role
      return res.redirect('back'); // Redirect back to the previous page
    }

    // Prevent an admin from removing their own admin privileges
    if (req.user.id === id) {
      req.flash(
        'error',
        'Admins cannot remove themselves from Admin, ask another admin.'
      ); // Flash an error message
      return res.redirect('back'); // Redirect back to the previous page
    }

    // Update the user's role in the database
    const user = await User.findByIdAndUpdate(
      id, // User ID to update
      { role }, // New role to set
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // Flash a success message and redirect back
    req.flash('info', `Updated role for ${user.email} to ${user.role}`);
    res.redirect('back');
  } catch (error) {
    // Pass any error to the next middleware
    next(error);
  }
});

// Export the router to use in other parts of the application
module.exports = router;
