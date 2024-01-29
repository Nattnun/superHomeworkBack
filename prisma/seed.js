const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const hashPassword = bcrypt.hashSync("123456", 10);

const teacherData = [
  {
    firstname: "Andy",
    t_code: "t001",
    password: hashPassword,
    email: "andy@ggg.mail",
  },
  {
    firstname: "Boby",
    t_code: "t002",
    password: hashPassword,
    email: "boby@ggg.mail",
  },
  {
    firstname: "Candy",
    t_code: "t003",
    password: hashPassword,
    email: "candy@ggg.mail",
  },
  {
    firstname: "Danny",
    t_code: "t004",
    password: hashPassword,
    email: "danny@ggg.mail",
  },
];

const subjectData = [
  { title: "HTML", description: "Write web page" },
  { title: "CSS", description: "Style web page" },
  { title: "JS", description: "Dynamic web page" },
];

async function run() {
  //   await prisma.teacher.createMany({ data: teacherData });
  await prisma.subject.createMany({ data: subjectData });
}

run();
