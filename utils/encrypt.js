const CryptoJS = require('crypto-js');

async function encryptData(plainText, key) {
  return CryptoJS.AES.encrypt(plainText, key).toString();
}

async function decryptData(cipherText, key) {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encryptData, decryptData };
