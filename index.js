const crypto = require("crypto");

// aes-128-cbc encryption
function encrypt(text, secretKey) {}

function decrypt(encryptedMessage, secretKey, ivHex) {}

const secretKey = Buffer.from("My-Secret-Key123");
const textToEncrypt = "This is a secret message";

const { encryptedMessage, iv } = encrypt(textToEncrypt, secretKey);

console.log("Encrypted Message: ", encryptedMessage);
console.log("IV: ", iv);
