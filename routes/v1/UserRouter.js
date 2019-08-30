const { Router } = require('express');
const userController = require('../../controllers/UserController');
const { validateUser, responseWhenReturningOneUser } = require('../../middlewares/UserMiddleware');

const userRouter = Router();

userRouter.get('/', (_req, res) => {
  const userList = userController.getAll();
  const response = {
    ok: true,
    results: userList,
  };
  res.status(200).json(response);
});

userRouter.get('/:id', (req, res) => {
  const user = userController.getOne(req);
  responseWhenReturningOneUser(user, res);
});

userRouter.post('/', validateUser, (req, res) => {
  const user = userController.createOne(req);
  const response = {
    ok: true,
    result: user,
  };
  res.status(201).json(response);
});

userRouter.put('/:id', validateUser, (req, res) => {
  const user = userController.updateOne(req);
  responseWhenReturningOneUser(user, res);
});

userRouter.delete('/:id', (req, res) => {
  const user = userController.deleteOne(req);
  if (user) {
    return res.status(204).json({});
  }
  res.status(404).json({
    ok: false,
    error: 'User not found',
  });
});

module.exports = userRouter;
