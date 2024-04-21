function aesEncrypt(key, data) {
   // 在客户端使用用户输入的密钥对数据进行 AES 加密
   // 返回加密后的数据
   // 这里可以使用现成的 AES 加密库，例如 CryptoJS
   const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
   return encryptedData;
}
