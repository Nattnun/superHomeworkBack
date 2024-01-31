require("dotenv").config(); //load file js that has config method
// console.log(process.env);
const cors = require("cors");
const express = require("express");
const notFound = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const authenticate = require("./middlewares/authenticate");
const homeworkRoute = require("./routes/homework-routes");
const subjectRoute = require("./routes/subject-route");

const app = express();

app.use(cors());
app.use(express.json());

//service api
app.use("/auth", authRoute);
app.use("/homework", homeworkRoute);
app.use("/subject", subjectRoute);

app.use(notFound);
app.use(errorMiddleware); //err ต้องอยู่ตัวสุดท้าย

let port = process.env.PORT;
app.listen(port, () => {
  console.log("server on", port);
});
