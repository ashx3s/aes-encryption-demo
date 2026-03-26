"use strict";
const crypto = require("crypto");
function decrypt(encryptedMessage, secretKey, ivHex) {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-128-cbc", secretKey, iv);
  let decrypted = decipher.update(encryptedMessage, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = decrypt;
