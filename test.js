(async () => {
    const dragAndDrop = require('./human-drag').dragAndDrop;
    const browser = await require('playwright').firefox.launch({ headless: false }); // or: chrome, firefox, webkit
    const addons = await import('playwright-addons');
    const page = await browser.newPage();

    // await addons.adblocker(browser);
    await addons.stealth(browser);
    await page.goto('http://anson.top/awsc/ali.html');


    while (page?.url) {
        try {
            let visible = false;
            do {
                btn = await page.$('#nc_1_n1z')
                visible = await btn?.isVisible()
            } while (!visible)
            await page.waitForTimeout(1000);

            const btnPosition = await btn.boundingBox();

            if (!btnPosition) {
                continue;
            }
            const width = await (await page.locator('#nc_1__scale_text').boundingBox()).width;

            // console.debug({btn:btn, x: btn.x, y: btn.y });
            let yDirection = Math.round(Math.random() * 10) > 4 ? -1 : 1;

            let from = {
                x: btnPosition.x + btnPosition.width / 2 + Math.round(Math.random() * 5) - 2,
                y: btnPosition.y + btnPosition.height / 2 + Math.round(Math.random() * 5) - 2
            };
            await dragAndDrop(
                page,
                from,
                {
                    x: from.x + width + Math.round(Math.random() * 10),
                    y: from.y + yDirection * Math.round(Math.random() * 10)
                });

        } catch (error) {
            console.debug(error);
        }
    }
    console.debug('end');

})();