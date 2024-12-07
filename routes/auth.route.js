// const router = require('express').Router();
// const User = require('../models/user.model');
// const { body, validationResult } = require('express-validator');
// const passport = require('passport');
// const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
// const { registerValidator } = require('../utils/validators');

// router.get(
//   '/login',
//   ensureLoggedOut({ redirectTo: '/' }),
//   async (req, res, next) => {
//     res.render('login');
//   }
// );

// router.post(
//   '/login',
//   ensureLoggedOut({ redirectTo: '/' }),
//   passport.authenticate('local', {
//     // successRedirect: '/',
//     successReturnToOrRedirect: '/',
//     failureRedirect: '/auth/login',
//     failureFlash: true,
//   })
// );

// router.get(
//   '/register',
//   ensureLoggedOut({ redirectTo: '/' }),
//   async (req, res, next) => {
//     res.render('register');
//   }
// );

// router.post(
//   '/register',
//   ensureLoggedOut({ redirectTo: '/' }),
//   registerValidator,
//   async (req, res, next) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         errors.array().forEach((error) => {
//           req.flash('error', error.msg);
//         });
//         res.render('register', {
//           email: req.body.email,
//           messages: req.flash(),
//         });
//         return;
//       }

//       const { email } = req.body;
//       const doesExist = await User.findOne({ email });
//       if (doesExist) {
//         req.flash('warning', 'Username/email already exists');
//         res.redirect('/auth/register');
//         return;
//       }
//       const user = new User(req.body);
//       await user.save();
//       req.flash(
//         'success',
//         `${user.email} registered succesfully, you can now login`
//       );
//       res.redirect('/auth/login');
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get(
//   '/logout',
//   ensureLoggedIn({ redirectTo: '/' }),
//   async (req, res, next) => {
//     req.logout();
//     res.redirect('/');
//   }
// );

// module.exports = router;

// Import necessary modules
const router = require('express').Router(); // Router to define routes
const User = require('../models/user.model'); // User model for database operations
const { body, validationResult } = require('express-validator'); // Validator for form input
const passport = require('passport'); // Passport for authentication
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login'); // Middleware to ensure login/logout states
const { registerValidator } = require('../utils/validators'); // Custom validator for user registration

// Route to display the login page
router.get(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }), // Ensure the user is logged out
  async (req, res, next) => {
    res.render('login'); // Render the login page
  }
);

// Route to handle login form submission
router.post(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }), // Ensure the user is logged out
  passport.authenticate('local', {
    successReturnToOrRedirect: '/', // Redirect to the original URL or home on success
    failureRedirect: '/auth/login', // Redirect back to the login page on failure
    failureFlash: true, // Display failure message
  })
);

// Route to display the registration page
router.get(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }), // Ensure the user is logged out
  async (req, res, next) => {
    res.render('register'); // Render the registration page
  }
);

// Route to handle registration form submission
router.post(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }), // Ensure the user is logged out
  registerValidator, // Validate registration inputs
  async (req, res, next) => {
    try {
      // Validate the request data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Flash validation errors to the user
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        // Render the registration page with the flashed messages
        res.render('register', {
          email: req.body.email, // Pre-fill the email field
          messages: req.flash(), // Pass flash messages
        });
        return;
      }

      const { email } = req.body; // Extract the email from the request body

      // Check if the email already exists in the database
      const doesExist = await User.findOne({ email });
      if (doesExist) {
        req.flash('warning', 'Username/email already exists'); // Flash warning message
        res.redirect('/auth/register'); // Redirect to the registration page
        return;
      }

      // Create a new user document and save it
      const user = new User(req.body);
      await user.save();

      // Flash success message and redirect to the login page
      req.flash(
        'success',
        `${user.email} registered successfully, you can now login`
      );
      res.redirect('/auth/login');
    } catch (error) {
      // Pass any error to the next middleware
      next(error);
    }
  }
);

// Route to handle user logout
router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }), // Ensure the user is logged in
  async (req, res, next) => {
    req.logout(); // Log the user out
    res.redirect('/'); // Redirect to the home page
  }
);

// Export the router to use in other parts of the application
module.exports = router;