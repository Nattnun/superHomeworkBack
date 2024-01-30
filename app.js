require("dotenv").config(); //load file js that has config method
// console.log(process.env);
const cors = require("cors");
const express = require("express");
const notFound = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user-only", authenticate, (req, res, next) => {
  res.json({ msg: req.user.firstname });
});

app.use(notFound);
app.use(errorMiddleware); //err ต้องอยู่ตัวสุดท้าย

let port = process.env.PORT;
app.listen(port, () => {
  console.log("server on", port);
});
