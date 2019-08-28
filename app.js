"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/v1/UserRouter");

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
