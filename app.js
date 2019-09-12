const app = require('express')();
const bodyParser = require('body-parser');
const userRouter = require('./routes/v1/UserRouter');
const cors = require('cors');

const port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
