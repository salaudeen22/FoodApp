const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");

const mongoDB = require("./db.js");

mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));
app.use("/api", require("./Routes/OrderData.js"));
app.use("/api", require("./Routes/CreateCompany.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
