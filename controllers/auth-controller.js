const bcrypt = require("bcryptjs");
const db = require("../models/db");

const tryCatch = (func) => (req, res, next) => func(req, res, next).catch(next);

exports.register = tryCatch(async (req, res, next) => {
  const { s_code, password, confirmPassword, firstname, email } = req.body;

  if (!(s_code && password && confirmPassword && firstname)) {
    return next(new Error("fulfill the blank input::400"));
  }
  if (password !== confirmPassword) {
    throw new Error("check confirm password::400");
  }
  const { confirmPassword: cfpw, ...data } = req.body;
  data.password = await bcrypt.hash(data.password, 10);
  // console.log(data);
  const newStudent = await db.student.create({ data: data });
  // console.log(newStudent);
  res.json({ msg: "Register Successfull" });
});
// exports.login = (req, res, next) => {};
