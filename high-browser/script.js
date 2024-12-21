let dictionary = {};

// 从data.json加载词典数据
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        dictionary = data;
    })
    .catch(error => console.error('Error loading dictionary:', error));

function padZero(number, length) {
    return String(number).padStart(length, '0');
}

function lookupCode() {
    let nameInput = document.getElementById("nameInput").value.trim();
    const originalNameInput = nameInput; // 保存原始输入以便后续比较
    nameInput = nameInput.replace(/\s+/g, ''); // 去除空格

    let trimmedNameInput = nameInput;
    if (trimmedNameInput.length < 4) {
        trimmedNameInput = padZero(trimmedNameInput, 4); // 不足4位的号码补0
    } else {
        trimmedNameInput = trimmedNameInput.slice(-4); // 超过4位的号码取后4位
    }

    let results = []; // 使用数组来保存结果

    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            const pairs = dictionary[key];
            for (const pair of pairs) {
                let trimmedCode = pair[0].slice(-4); // 只取号码末4位
                if (trimmedCode.length < 4) {
                    trimmedCode = padZero(trimmedCode, 4); // 不足4位补0
                }
                // 将输入的名字与号码后4位分开比较
                if (pair[1].includes(originalNameInput) || trimmedCode === trimmedNameInput) {
                    results.push(`${pair[0]}${pair[1]}----${key}`);
                }
            }
        }
    }

    // 按照号码顺序进行排序
    results.sort((a, b) => {
        const codeA = a.substring(0, 4);
        const codeB = b.substring(0, 4);
        return codeA.localeCompare(codeB, undefined, { numeric: true });
    });

    const resultDiv = document.getElementById("result");
    if (results.length > 0) {
        resultDiv.innerHTML = results.join('<br>');
    } else {
        resultDiv.textContent = "Name or number not found.";
    }
}