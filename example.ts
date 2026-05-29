import middleware from "./index";
import express from "express";

const app = express();
const EXPRESS_PORT = 7071;
const options = { url: `http://10.115.1.100:30097/v3/users/self` };

app.use(middleware(options));

app.get("/", (req, res) => {
  res.send(res.locals.user);
});

app.listen(EXPRESS_PORT, () => {
  console.log(`[Express] Listening on port ${EXPRESS_PORT}`);
});
