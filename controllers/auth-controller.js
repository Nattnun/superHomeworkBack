const bcrypt = require("bcryptjs");
const db = require("../models/db");
const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");

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

exports.login = tryCatch(async (req, res, next) => {
  const { s_code, t_code, password } = req.body;
  console.log(req.body);

  if (s_code && t_code) {
    throw new Error("Teacher or Student::400");
  }

  if (s_code && !/^[s]\d{3}$/.test(s_code)) {
    throw new Error("Wrong code format");
  }

  if (t_code && !/^[t]\d{3}$/.test(t_code)) {
    throw new Error("Wrong code format");
  }

  const result = t_code
    ? await db.teacher.findFirstOrThrow({ where: { t_code: t_code } })
    : await db.student.findFirstOrThrow({ where: { s_code: s_code } });

  let pwOk = await bcrypt.compare(password, result.password);
  if (!pwOk) {
    throw new Error("invalid login::400");
  }

  const payload = t_code
    ? { id: result.id, t_code: result.t_code }
    : { id: result.id, s_code: result.s_code };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.json({ token });
});

exports.getMe = (req, res, next) => {
  res.json({ user: req.user });
};
