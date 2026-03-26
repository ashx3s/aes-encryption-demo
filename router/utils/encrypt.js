"use strict";
const crypto = require("crypto");

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

module.exports = encrypt;
