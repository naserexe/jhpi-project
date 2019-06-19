const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.roll = !isEmpty(data.roll) ? data.roll : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.semester = !isEmpty(data.semester) ? data.semester : "";
  data.shift = !isEmpty(data.shift) ? data.shift : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.roll, { min: 6, max: 6 })) {
    errors.roll = "Roll must be 6 numbers";
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }

  if (Validator.isEmpty(data.semester)) {
    errors.semester = "Semester field is required";
  }

  if (Validator.isEmpty(data.shift)) {
    errors.shift = "Shift field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
