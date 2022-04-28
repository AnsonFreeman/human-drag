# HumanDrag

### 简介
基于playwright的模拟人类的鼠标拖拽行为。
![demo1](https://raw.githubusercontent.com/AnsonFreeman/human-drag/main/images/slide1.gif)
![demo2](https://raw.githubusercontent.com/AnsonFreeman/human-drag/main/images/slide2.gif)
<br>


### 安装
```shell
npm install
```

### 调用
```javascript
    const dragAndDrop = require('./human-drag').dragAndDrop;
    const browser = await require('playwright').firefox.launch({ headless: false }); // or: chrome, firefox, webkit
    const addons = await import('playwright-addons');
    const page = await browser.newPage();

    await addons.stealth(browser);
    await page.goto('http://anson.top/awsc/ali.html');

    const btnPosition = await btn.boundingBox();
    const width = await (await page.locator('#nc_1__scale_text').boundingBox()).width;

    let from = {
        x: btnPosition.x + btnPosition.width / 2 + Math.round(Math.random() * 5) - 2,
        y: btnPosition.y + btnPosition.height / 2 + Math.round(Math.random() * 5) - 2
    };

    let dest = { 
        x: from.x + width + Math.round(Math.random() * 10), 
        y: from.y + Math.round(Math.random() * 10)
    };
    await dragAndDrop(page, from, dest);

```

### 运行示例

```shell
node test.js 
```
