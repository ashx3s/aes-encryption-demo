"use strict";
const crypto = require("crypto");

// aes-128-cbc encryption
function encrypt(text, secretKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-128-cbc", secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encryptedMessage: encrypted, iv: iv.toString("hex") };
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
