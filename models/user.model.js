// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const createHttpError = require('http-errors');
// const { roles } = require('../utils/constants');

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: [roles.admin, roles.moderator, roles.client],
//     default: roles.client,
//   },
// });

// UserSchema.pre('save', async function (next) {
//   try {
//     if (this.isNew) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(this.password, salt);
//       this.password = hashedPassword;
//       if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
//         this.role = roles.admin;
//       }
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// UserSchema.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw createHttpError.InternalServerError(error.message);
//   }
// };

// const User = mongoose.model('user', UserSchema);
// module.exports = User;


const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const bcrypt = require('bcrypt'); // Bcrypt for password hashing
const createHttpError = require('http-errors'); // HttpError for error handling
const { roles } = require('../utils/constants'); // Import predefined roles from constants

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
  email: {
    type: String, // Email must be a string
    required: true, // Email is mandatory
    lowercase: true, // Convert email to lowercase
    unique: true, // Ensure email is unique
  },
  password: {
    type: String, // Password must be a string
    required: true, // Password is mandatory
  },
  role: {
    type: String, // Role must be a string
    enum: [roles.admin, roles.moderator, roles.client], // Restrict role to predefined values
    default: roles.client, // Default role is 'client'
  },
});

// Pre-save hook to perform actions before saving a new user document
UserSchema.pre('save', async function (next) {
  try {
    // Check if the document is newly created
    if (this.isNew) {
      // Generate a salt for hashing the password
      const salt = await bcrypt.genSalt(10);
      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(this.password, salt);
      // Replace the plain password with the hashed version
      this.password = hashedPassword;

      // Automatically assign 'admin' role if the email matches the admin email
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin;
      }
    }
    next(); // Proceed to save the document
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Instance method to validate a user's password
UserSchema.methods.isValidPassword = async function (password) {
  try {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // Throw an internal server error if password comparison fails
    throw createHttpError.InternalServerError(error.message);
  }
};

// Create the User model from the schema
const User = mongoose.model('user', UserSchema);

// Export the User model for use in other parts of the application
module.exports = User;
