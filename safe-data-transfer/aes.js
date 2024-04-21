const express = require('express');
const bodyParser = require('body-parser');
const aes256 = require('aes256'); // 或者其他 AES 加密库

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// 加密数据接口
app.post('/encrypt', (req, res) => {
    const encryptedDataFromClient = req.body.encryptedData;
    const serverKey = process.env.SERVER_SECRET_KEY; // 从环境变量获取服务器固定密钥

    // 使用服务器密钥进行第二层加密
    const doubleEncryptedData = aes256.encrypt(serverKey, encryptedDataFromClient);

    // 返回加密后的数据给客户端
    res.json({ doubleEncryptedData });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
