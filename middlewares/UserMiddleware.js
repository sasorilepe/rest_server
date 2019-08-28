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
        const age = Number(value);
        if (isNaN(age) || age < 0) {
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

function validateUser(req, res, next) {
  const { firstName, lastName, age } = req.body;
  const fields = [
    { field: "firstName", value: firstName },
    { field: "lastName", value: lastName },
    { field: "age", value: age }
  ];

  const errors = getErrors(fields).filter(error => error != null);

  if (errors.length) {
    return res.status(400).json({
      ok: false,
      errors
    });
  }

  next();
}

function responseWhenUserIsNull(user, res, callback) {
  if (!user) {
    return res.status(404).json({
      ok: false,
      error: "User not found"
    });
  }
  callback();
}

module.exports = {
  validateUser,
  responseWhenUserIsNull
};
