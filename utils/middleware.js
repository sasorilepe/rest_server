/* jshint esversion: 6 */

function getErrors(fields = []) {
  return fields.map(item => {
    const { field, value } = item;

    if (field === "age") {
      if (value === undefined) {
        return {
          field,
          message: "It is mandatory"
        };
      } else {
        if (isNaN(value) || value < 0) {
          return {
            field,
            message: "Must be a positive number or zero"
          };
        }
        return null;
      }
    }

    switch (value) {
      case undefined:
        return {
          field,
          message: "It is mandatory"
        };
      case "":
        return {
          field,
          message: "Must be a non-empty string"
        };
      default:
        if (!isNaN(parseInt(value))) {
          return {
            field,
            message: "Must be a non-empty string"
          };
        }
        return null;
    }
  });
}

function validateAll(req) {
  const fields = [
    { field: "firstName", value: req.body.firstName },
    { field: "lastName", value: req.body.lastName },
    { field: "age", value: req.body.age }
  ];

  return getErrors(fields).filter(error => error != null);
}

module.exports = {
  validateAll
};
