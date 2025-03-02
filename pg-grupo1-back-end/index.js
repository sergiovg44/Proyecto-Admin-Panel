const express = require("express");

const usersRouter = require("./routes/userRouter.js");
const loginRouter = require("./routes/loginRouter.js");

const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./db/db.js");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);

connectToDatabase();

app.listen(4000, () => {
  console.log("Server is running http://localhost:4000");
});
