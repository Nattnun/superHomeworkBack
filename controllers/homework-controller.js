const tryCatch = require("../utils/tryCatch");
const db = require("../models/db");

exports.createHomework = tryCatch(async (req, res, next) => {
  const { question, startdate, duedate, published, subjectId, teacherId } =
    req.body;

  console.log(req.body);

  //validate that user must be teacher
  if (req.user.role !== "teacher") {
    throw new Error("Unauthorized::400");
  }
  const rs = await db.homework.create({
    data: {
      subjectId: +subjectId,
      question,
      startdate,
      duedate,
      published,
      teacherId: req.user.id,
    },
  });
  res.json({ result: rs });
});

exports.getByTeacher = tryCatch(async (req, res, next) => {
  const homework = await db.homework.findMany({
    where: { teacherId: req.user.id },
    include: {
      subject: {
        select: { title: true },
      },
    },
  });
  res.json({ homework });
});

exports.update = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { question, startdate, duedate, published, subjectId } = req.body;
  const rs = await db.homework.update({
    where: { id: +id },
    data: {
      subjectId: +subjectId,
      question,
      startdate,
      duedate,
      published,
      teacherId: req.user.id,
    },
  });
  res.json({ result: rs });
});

exports.delete = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  await db.homework.delete({
    where: { id: +id },
  });

  res.json({ msg: "delete Ok" });
});
