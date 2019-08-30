const userService = require('../services/UserService');

const getAll = () => userService.getAll();

const getOne = (req) => {
  const { id } = req.params;
  const user = userService.getOneById(Number(id));
  return user;
};

const createOne = (req) => {
  const { body: userData } = req;
  const user = userService.createOne(userData);
  return user;
};

const updateOne = (req) => {
  const {
    body: userData,
    params: { id },
  } = req;
  const user = userService.updateOneById(Number(id), userData);
  return user;
};

const deleteOne = (req) => {
  const { id } = req.params;
  const user = userService.deleteOneById(Number(id));
  return user;
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
