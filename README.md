# HumanDrag

### 简介
基于playwright的模拟人类的鼠标拖拽行为。
<br>
![demo1](https://raw.githubusercontent.com/AnsonFreeman/human-drag/main/images/slide1.gif)
<br>
![demo2](https://raw.githubusercontent.com/AnsonFreeman/human-drag/main/images/slide2.gif)
<br>


### 安装
```shell
npm install
```

### 调用
```javascript

const dragAndDrop = require('./human-drag').dragAndDrop;
const browser = await require('playwright').firefox.launch({ headless: false });
const page = await browser.newPage();
await page.goto('somesite');
await dragAndDrop(page, {x: 100, y: 50 }, {x: 400, y: 100 });

```

### 运行示例

```shell
node test.js 
```
