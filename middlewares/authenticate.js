const jwt = require("jsonwebtoken");
const db = require("../models/db");
const tryCatch = require("../utils/tryCatch");

module.exports = tryCatch(async (req, res, next) => {
  const authorization = req.headers.authorization;
  //validation
  if (!authorization) {
    throw new Error("Unauthorized");
  }
  if (!authorization.startsWith("Bearer")) {
    throw new Error("Unauthorized");
  }
  //get token from header
  const token = authorization.split(" ")[1];
  console.log(token);

  if (!token) {
    throw new Error("Unauthorized");
  }
  //get payload from token
  const { id, s_code, t_code } = jwt.verify(token, process.env.JWT_SECRET);

  //get user data
  const result = t_code
    ? await db.teacher.findFirstOrThrow({ where: { t_code: t_code } })
    : await db.student.findFirstOrThrow({ where: { s_code: s_code } });

  //exclude the password
  delete result.password;

  //add role
  result.role = t_code ? "teacher" : "student";
  //replace the request by result next middleware will use this values
  req.user = result;
  console.log(result);
  next();
});
