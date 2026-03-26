"use strict";
const crypto = require("crypto");
const express = require("express");
const encrypt = require("./utils/encrypt");
const decrypt = require("./utils/decrypt");
const app = express();
app.use(express.json());
app.post("/encrypt", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }
  const secretKey = crypto.randomBytes(16);
  const result = encrypt(message, secretKey);
  res.json(result);
});

app.post("/decrypt", (req, res) => {
  const { encryptedMessage, iv, key } = req.body;
  if (!encryptedMessage || !iv || !key) {
    return res
      .status(400)
      .json({ error: "encryptedMessage, iv, and key are required" });
  }
  try {
    const decryptedMessage = decrypt(
      encryptedMessage,
      Buffer.from(key, "hex"),
      iv,
    );
    res.json({ decryptedMessage });
  } catch (error) {
    res.status(400).json({ error: "Decryption Failed" });
  }
});

app.listen(3000, () => {
  console.log("Encryption Server Running on http://localhost:3000");
});
