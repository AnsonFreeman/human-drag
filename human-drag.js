/**
 * @param page
 * @param { x:number, y:number } from 
 * @param { x:number, y:number } dest 
 * @param { speed: int} options 
 */
async function dragAndDrop(page, from, dest, options = { speed: 5 }) {
    //move to target
    await page.mouse.move(
        from.x,
        from.y,
        { steps: Math.round(Math.random() * 5) + 5 }
    )
    let width = dest.x - from.x;
    let height = dest.y - from.y;
    let baseV = Math.round(Math.random() * options.speed * 100);
    // let yDirection = Math.round(Math.random() * 10) > 4 ? -1 : 1;

    await page.mouse.down()
    await page.waitForTimeout(Math.round(Math.random() * 200));

    //first 1/2 of the way
    await page.mouse.move(
        from.x + Math.round(Math.random() * width / 2),
        from.y + Math.round(Math.random() * height / 2),
        { steps: Math.round(Math.random() * 10) + baseV }
    );

    if (Math.round(Math.random() * 10) > 5 ? -1 : 1) {
        //first 2/3 of the way
        await page.mouse.move(
            from.x + Math.round(width / 2) + Math.round(Math.random() * width * 2 / 3),
            from.y + Math.round(height / 2) + Math.round(Math.random() * height * 2 / 3),
            { steps: Math.round(Math.random() * 10) + baseV }
        );
    };

    //rest of the way
    await page.mouse.move(
        from.x + width + Math.round(Math.random() * 3),
        from.y + height + Math.round(Math.random() * 3),
        { steps: Math.round(Math.random() * 10) + baseV }
    );

    //drop
    await page.waitForTimeout(Math.round(Math.random() * 600));
    await page.mouse.up();
}

async function slideAndDrop(page, from, dest) {
    //move to target
    await page.mouse.move(
        from.x,
        from.y,
        { steps: Math.round(Math.random() * 10) + 5 }
    )
    let width = dest.x - from.x;
    let baseV = Math.round(Math.random() * 300);
    // let yDirection = Math.round(Math.random() * 10) > 4 ? -1 : 1;

    await page.mouse.down()
    await page.waitForTimeout(Math.round(Math.random() * 200));

    let yDirection = Math.round(Math.random() * 10) > 4 ? -1 : 1;
    let toX = from.x;
    let toY = from.y;
    //first 1/2 of the way
    await page.mouse.move(
        toX = toX + Math.round(Math.random() * width / 2),
        toY = toY + yDirection * Math.round(Math.random() * 10),
        { steps: Math.round(Math.random() * 20) + baseV }
    );

    for (let index = 0; index < 5; index++) {
        if (Math.round(Math.random() * 10) > 5 ? -1 : 1) {
            //first 2/3 of the way
            await page.mouse.move(
                toX = toX + Math.round(Math.random() * 50),
                toY = toY + yDirection * Math.round(Math.random() * 10),
                { steps: Math.round(Math.random() * 20) + baseV }
            );
        };
    }


    //rest of the way
    await page.mouse.move(
        from.x + width + Math.round(Math.random() * 3),
        toY + yDirection * Math.round(Math.random() * 10),
        { steps: Math.round(Math.random() * 20) + baseV }
    );

    //drop
    await page.waitForTimeout(Math.round(Math.random() * 600));
    await page.mouse.up();
}

module.exports = { dragAndDrop, slideAndDrop };
