const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
  },
  {
    id: 2,
    firstName: 'Jenny',
    lastName: 'Doe',
    age: 21,
  },
];

const getIndexById = (id) => users.findIndex((user) => user.id === id);

const getAll = () => users;

const getOneById = (id) => {
  const index = getIndexById(id);
  if (index === -1) {
    return null;
  }
  return users[index];
};

const createOne = (user) => {
  const newUser = { ...user, id: users.length + 1 };
  users.push(newUser);
  return user;
};

const updateOneById = (id, userData) => {
  const user = getOneById(id);
  if (user === null) {
    return null;
  }
  const index = getIndexById(id);
  users[index] = { ...user, ...userData };
  return users[index];
};

const deleteOneById = (id) => {
  const index = getIndexById(id);
  if (index === -1) {
    return null;
  }
  users.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
};
