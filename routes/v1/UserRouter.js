const { Router } = require('express');
const userController = require('../../controllers/UserController');
const { validateUser, responseWhenUserIsNull } = require('../../middlewares/UserMiddleware');

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
  responseWhenUserIsNull(user, res, () => {
    const response = {
      ok: true,
      result: user,
    };
    res.status(200).json(response);
  });
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
  responseWhenUserIsNull(user, res, () => {
    const response = {
      ok: true,
      result: user,
    };
    res.status(200).json(response);
  });
});

userRouter.delete('/:id', (req, res) => {
  const response = {};
  const user = userController.deleteOne(req);
  responseWhenUserIsNull(user, res, () => {
    res.status(204).json(response);
  });
});

module.exports = userRouter;
