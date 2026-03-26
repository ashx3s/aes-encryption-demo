"use strict";
const crypto = require("crypto");
const express = require("express");

const app = express();
app.use(express.json());

// aes-128-cbc encryption
function encrypt(text, secretKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-128-cbc", secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    encryptedMessage: encrypted,
    iv: iv.toString("hex"),
    key: secretKey.toString("hex"),
  };
}

function decrypt(encryptedMessage, secretKey, ivHex) {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-128-cbc", secretKey, iv);
  let decrypted = decipher.update(encryptedMessage, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const secretKey = Buffer.from("My-Secret-Key123");
const textToEncrypt = "This is a secret message";

const { encryptedMessage, iv } = encrypt(textToEncrypt, secretKey);

console.log("Encrypted Message: ", encryptedMessage);
console.log("IV: ", iv);

const decryptedMessage = decrypt(encryptedMessage, secretKey, iv);
console.log("Decrypted Message: ", decryptedMessage);

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
