// const { body } = require('express-validator');
// module.exports = {
//   registerValidator: [
//     body('email')
//       .trim()
//       .isEmail()
//       .withMessage('Email must be a valid email')
//       .normalizeEmail()
//       .toLowerCase(),
//     body('password')
//       .trim()
//       .isLength(2)
//       .withMessage('Password length short, min 2 char required'),
//     body('password2').custom((value, { req }) => {
//       if (value !== req.body.password) {
//         throw new Error('Password do not match');
//       }
//       return true;
//     }),
//   ],
// };


const { body } = require('express-validator');

module.exports = {
  // Validator for user registration inputs
  registerValidator: [
    // Validate and sanitize the 'email' field
    body('email')
      .trim() // Remove leading and trailing whitespace
      .isEmail() // Ensure the value is a valid email
      .withMessage('Email must be a valid email') // Custom error message
      .normalizeEmail() // Normalize the email format (e.g., convert to lowercase, remove dots in Gmail addresses)
      .toLowerCase(), // Ensure the email is in lowercase

    // Validate the 'password' field
    body('password')
      .trim() // Remove leading and trailing whitespace
      .isLength(2) // Ensure the password is at least 2 characters long
      .withMessage('Password length short, min 2 char required'), // Custom error message

    // Custom validator for 'password2' to ensure it matches 'password'
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        // Check if 'password2' matches 'password'
        throw new Error('Password do not match'); // Throw error if passwords do not match
      }
      return true; // Return true if passwords match
    }),
  ],
};
