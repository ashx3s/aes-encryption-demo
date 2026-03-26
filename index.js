"use strict";
const express = require("express");
const router = require("./router/router");

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
  console.log("Encryption Server Running on http://localhost:3000");
  console.log("  POST /api/encrypt  — encrypt a message");
  console.log("  POST /api/decrypt  — decrypt a message");
});
