/* jshint esversion: 6 */

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 21
  },
  {
    id: 2,
    firstName: "Jenny",
    lastName: "Doe",
    age: 21
  }
];

const getAll = () => {
  return users;
};

const getOneById = id => {
  const usersFiltered = users.filter(user => user.id == id);
  return usersFiltered.length > 0 ? usersFiltered[0] : null;
};

const createOne = user => {
  user.id = users.length + 1;
  users.push(user);
  return user;
};

const updateOneById = (id, userData) => {
  for (const user of users) {
    if (user.id == id) {
      Object.assign(user, userData);
      return user;
    }
  }
  return null;
};

const deleteOneById = id => {
  for (const index in users) {
    if (users[index].id == id) {
      users.splice(index, 1);
      return true;
    }
  }
  return false;
};

module.exports = {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById
};
