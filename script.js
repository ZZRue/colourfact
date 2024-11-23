const colorBox = document.getElementById("color-box");
const generateButton = document.getElementById("generate");
const factContainer = document.getElementById("fact-container");

// 获取随机颜色
const fetchRandomColor = async () => {
    try {
        const response = await fetch('https://www.thecolorapi.com/random');
        const data = await response.json();
        const hexColor = data.hex.value; // 获取随机颜色的HEX值
        colorBox.style.backgroundColor = hexColor;

        // 将HEX颜色转换为十进制值并提取后两位
        const decimalValue = hexToDecimal(hexColor);
        const lastTwoDigits = decimalValue % 100; // 提取后两位数字

        // 使用后两位数字获取NumbersAPI的数字事实
        fetchNumberFact(lastTwoDigits);
    } catch (error) {
        console.error("Error fetching random color:", error);
    }
};

// HEX转十进制
const hexToDecimal = (hex) => {
    // 移除前缀
    const hexColor = hex.replace("#", "");
    return parseInt(hexColor, 16); // 将HEX转为十进制
};

// 获取数字事实
const fetchNumberFact = async (number) => {
    try {
        const response = await fetch(`https://numbersapi.com/${number}?json`);
        const data = await response.json();

        if (data && data.text) {
            factContainer.textContent = `Fact about number ${number}: ${data.text}`;
        } else {
            factContainer.textContent = `No fact found for number ${number}.`;
        }
    } catch (error) {
        console.error("Error fetching number fact:", error);
        factContainer.textContent = "Error fetching number fact.";
    }
};

// 点击按钮时触发随机颜色生成并展示数字事实
generateButton.addEventListener("click", fetchRandomColor);
