const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const usersRouter = require("./app/routes/user.route");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(usersRouter);

app.listen(4000, () => {
  console.log("Server Run on port:" + 4000);
});