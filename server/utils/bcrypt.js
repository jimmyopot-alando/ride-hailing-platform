// server/utils/bcrypt.js
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 * @param {String} password - Plain text password
 * @returns {Promise<String>} - Hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare plain text password with hashed password
 * @param {String} password - Plain text password
 * @param {String} hashedPassword - Hashed password from DB
 * @returns {Promise<Boolean>} - True if match, false otherwise
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
