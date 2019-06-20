const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSearchInput(data) {
  let errors = {};

  data.search = !isEmpty(data.search) ? data.search : "";

  if (!Validator.isLength(data.search, { min: 6, max: 6 })) {
    errors.search = "Roll must be 6 numbers";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
