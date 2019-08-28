const { Router } = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require("../../controllers/UserController");
const { validateUser } = require("../../middlewares/UserMiddleware");
const userRouter = Router();

userRouter.get("/", (_req, res) => {
  const userList = getAll();
  const response = {
    ok: true,
    results: userList
  };
  res.status(200).json(response);
});

userRouter.get("/:id", (req, res) => {
  const user = getOne(req);
  const response = {
    ok: true,
    result: user
  };
  res.status(200).json(response);
});

userRouter.post("/", validateUser, (req, res) => {
  const user = createOne(req);
  const response = {
    ok: true,
    result: user
  };
  res.status(201).json(response);
});

userRouter.put("/:id", validateUser, (req, res) => {
  const user = updateOne(req);
  const response = {
    ok: true,
    result: user
  };
  res.status(200).json(response);
});

userRouter.delete("/:id", (req, res) => {
  const response = {};
  deleteOne(req);
  res.status(204).json(response);
});

module.exports = userRouter;
