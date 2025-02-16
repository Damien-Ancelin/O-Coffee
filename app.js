import "dotenv/config";
import express from "express";
import session from "express-session";
import emailjs from "@emailjs/nodejs";

const app = express();

import router from "./app/router.js";
import { MW404 } from "./app/middlewares/NotFound.js";
import { howManyProductsMW } from "./app/middlewares/howManyProductMW.js";
import { loadUserToLocals } from "./app/middlewares/loadUserLocals.js";

emailjs.init({
  publicKey: process.env.PUBLIC_KEY_EMAILJS,
  privateKey: process.env.PRIVATE_KEY_EMAILJS,
  blockList: {
    list: [],
  },
  limitRate: {
    throttle: 10000, // 10s
  },
});

app.use(
  session({
    secret: process.env.SECRETSENTENCE,
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 3000;

app.use(loadUserToLocals);
app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(howManyProductsMW);
app.use(router);
app.use(MW404);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
