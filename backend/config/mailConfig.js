import nodemailer from "nodemailer";
import { create } from "express-handlebars";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";
import path from "path";
import envCaptured from "./envValidation.js";

const transporter = nodemailer.createTransport({
    host: envCaptured.mailModule.mailHost,
    port: 587,
    secure: false,
    auth: {
      user: envCaptured.mailModule.mailAuthUser,
      pass: envCaptured.mailModule.mailAuthPass,
    },
  }),
  hbs = create({
    extname: ".hbs",
    layoutsDir: path.resolve("./templates/"),
    defaultLayout: false,
  });

transporter.use(
  "compile",
  nodemailerExpressHandlebars({
    viewEngine: hbs,
    viewPath: path.resolve("./templates/"),
    extName: ".hbs",
  })
);

export default transporter;
