// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user.model');

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         // Username/email does NOT exist
//         if (!user) {
//           return done(null, false, {
//             message: 'Username/email not registered',
//           });
//         }
//         // Email exist and now we need to verify the password
//         const isMatch = await user.isValidPassword(password);
//         return isMatch
//           ? done(null, user)
//           : done(null, false, { message: 'Incorrect password' });
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// Import necessary modules
const passport = require('passport'); // Passport for authentication
const LocalStrategy = require('passport-local').Strategy; // Local strategy for username/password authentication
const User = require('../models/user.model'); // User model for database operations

// Configure Passport to use a local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use 'email' instead of default 'username'
      passwordField: 'password', // Use 'password' as the password field
    },
    async (email, password, done) => {
      try {
        // Find a user by their email
        const user = await User.findOne({ email });

        // Check if the user exists or not
        if (!user) {
          // User with this email is not registered
          return done(null, false, {
            message: 'Username/email not registered', // Failure message
          });
        }

        // Verify the user's password
        const isMatch = await user.isValidPassword(password);

        // If the password matches, authenticate the user
        return isMatch
          ? done(null, user) // Successful authentication
          : done(null, false, { message: 'Incorrect password' }); // Failure message for incorrect password
      } catch (error) {
        // Handle any errors during the authentication process
        done(error);
      }
    }
  )
);

// Serialize user instance to store in the session
passport.serializeUser(function (user, done) {
  done(null, user.id); // Save the user ID in the session
});

// Deserialize user instance by fetching the user from the database using the stored ID
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user); // Return the user object if found
  });
});
