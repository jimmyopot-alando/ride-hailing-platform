// server/middlewares/validateRequest.js
const Joi = require("joi");

/**
 * Middleware to validate request bodies against a Joi schema
 * @param {Joi.Schema} schema - Joi validation schema
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
};

/**
 * Middleware to validate request params against a Joi schema
 * @param {Joi.Schema} schema - Joi validation schema
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
};

/**
 * Middleware to validate query strings against a Joi schema
 * @param {Joi.Schema} schema - Joi validation schema
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
};

module.exports = {
  validateRequest,
  validateParams,
  validateQuery,
};
