(async () => {
    const { firefox, chromium, webkit, chrome, devices } = require('playwright');

    const { slideAndDrop, slideAndDropV1, slideAndDropRand } = require('./human-drag');
    const browser = await firefox.launch({
        headless: false,
        // devtools: true,
        // firefoxUserPrefs: {
        //     'devtools.responsive.reloadConditions.touchSimulation': true
        // }
    }); // or: chromium, firefox, webkit
    const addons = await import('playwright-addons');
    //设置设备
    // const device = devices['iPhone 6'];
    // const context = await browser.newContext({
    //     // ...device,
    //     //语言
    //     // locale: 'de-DE',
    //     // //时区
    //     // timezoneId: 'America/Adak',
    //     // //经纬度
    //     // longitude: 29.979097,
    //     // latitude: 31.134256,
    //     // colorScheme: 'dark',
    //     // //设置useragent
    //     // userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 MicroMessenger/7.0.3(0x17000321) NetType/WIFI Language/zh_CN',
    //     // //屏幕大小
    //     // viewport: { width: 2024, height: 1768 },
    //     hasTouch: true,
    //     // isMobile: true,
    // });

    await addons.stealth(browser);
    // await addons.adblocker(browser);
    const page = await browser.newPage();
    await page.goto('http://anson.top/awsc/ali.html');

    // await page.waitForTimeout(9000000);
    let max = 30;
    while (page?.url() && max-- > 0) {
        try {
            let visible = false;
            do {
                btn = await page.$('#nc_1_n1z')
                visible = await btn?.isVisible()
            } while (!visible)
            await page.waitForTimeout(1000);

            const btnPosition = await btn.boundingBox()

            if (!btnPosition) {
                continue;
            }
            const width = await (await page.locator('#nc_1__scale_text').boundingBox()).width;

            // console.debug({btn:btn, x: btn.x, y: btn.y });
            // let yDirection = Math.round(Math.random() * 10) > 4 ? -1 : 1;

            let from = {
                x: btnPosition.x + btnPosition.width / 2 + Math.round(Math.random() * 5) - 2,
                y: btnPosition.y + btnPosition.height / 2 + Math.round(Math.random() * 5) - 2
            };

            let to = {
                x: from.x + width + Math.round(Math.random() * 10),
                y: from.y,
            };

            // if (Math.random() * 10 > 4) {
            await slideAndDrop(page, from, to);
            // } else {
            // await slideAndDropV1(page, from, to);
            // }

        } catch (error) {
            console.debug(error);
        }
    }
    console.debug('end');

    process.exit();
})();