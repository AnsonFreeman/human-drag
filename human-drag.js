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

    if (Math.round(Math.random() * 10) > 5) {
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

async function slideAndDropV1(page, from, dest) {
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
        toX = toX + Math.round(Math.random() * width / 3),
        toY = toY + yDirection * Math.round(Math.random() * 10),
        { steps: Math.round(Math.random() * 20) + baseV }
    );

    let rndMax = Math.round(Math.random() * 10) % 8 - 2;
    for (let index = 0; index < rndMax; index++) {
        //first 2/3 of the way
        await page.mouse.move(
            toX = toX + Math.round(Math.random() * 30),
            toY = toY + yDirection * Math.round(Math.random() * 10),
            { steps: Math.round(Math.random() * 50) + baseV }
        );
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


async function slideAndDrop(page, from, dest) {
    //move to target
    await page.mouse.move(
        from.x,
        from.y,
        { steps: Math.round(Math.random() * 10) + 5 }
    )
    let width = dest.x - from.x;
    let baseV = Math.round(Math.random() * 60) + 10;
    // let yDirection = Math.round(Math.random() * 10) > 4 ? -1 : 1;

    await page.mouse.down()
    await page.waitForTimeout(Math.round(Math.random() * 200));

    let yDirection = Math.round(Math.random() * 10) > 4 ? -1 : 1;

    const travelXPool = [
        [1, 2, 3, 4, 5, 10, 20, -23, -10, 50, 32, 32, 32, 23, 20, 20, 10, 10],
        [1, 2, 3, 4, 5, -5, -5, -5, 20, -13, -10, 50, 42, 32, 32, 20, 23, 20, 20, 10, 10, 5, 3],
        [1, 2, 3, 4, 5, 20, -13, -10, 10, 40, 42, 32, 32, 20, 23, -5, -5, -5, -3, -2, -1, 20, 20, 10, 10, 5, 3],
        [4, 5, 20, -5, -10, 10, 40, 42, 32, 32, 20, 23, -5, -5, -5, -3, -2, -1, 20, 20, 10, 10, 5, 3],
        [4, 5, 20, 10, 40, 42, 32, 32, 20, 23, -5, -5, -5, -5, -5, -5, -3, -2, -1, 20, 20, 10, 10, 5, 3],
        [4, 5, 20, 10, 40, -5, -5, -10, -5, -5, -5, -3, -2, -1, 42, 32, 32, 20, 23, 20, 20, 10, 10, 5, 5, 3],
        [1, 2, 3, 4, 5, 10, 20, 23, 50, 32, 32, 32, 20, 20, 10, 10],
        [1, 4, 5, 10, 20, 23, 40, 32, 5, 3, 2, 32, 32, 20, 20, 10, 10],
        [10, 20, 23, 40, 32, 5, 3, 2, 32, 32, 20, 20, 10, 10, 5, 4, 3, 2],
        [1, 4, 5, 10, 20, 23, 40, 32, 5, 30, 20, 12, 10, 10, 10, 10, 10, 10, 5],
        [4, 5, 10, 20, 23, 40, 32, 20, 20, 20, 12, 10, 10, 10, 10, 10, 10, 5],
        [3, 5, 10, 10, 20, 33, 20, 42, 22, 22, 15, 10, 10, 10, 5, 2, 1, 2],
        [3, 5, 20, 20, 20, 13, 20, 10, 10, 10, 10, 32, 22, 22, 35, 10, 10, 10, 2],
        [10, 10, 10, 10, 20, 20, 20, 30, 40, 50, 32, 32, 32, 20, 20, 10, 10],
        [30, 20, 23, 23, 32, 22, 22, 20, 15, 14, 12, 11, 10, 10, 10, 1, 1, 1, 1, 1, 1],
        [10, 30, 50, 30, 30, 30, 20, 10],
    ],
        travelYPool = [
            [0, 1, 2, 3, 4, 3, 2, 1],
            [0, 1, 0, 0, 2, 3, 4],
            [0, 3, 1, 0, 0, 0, 4],
            [2, 3, 1, 0, 0, 0, 0, 1],
            [0, 0, 2, 1, 0, 0, 0, 4, 0, 0, 0, 3, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1],
            [0, 0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 1],
            [0, 0, 1, 0, 3, 0, 0, 0, 0, 2, 0, 0, 3],
            [0, 0, 1, 3, 1, 0, 1, 0, 0, 2, 0, 0, 2],
            [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        ];

    let travelX = travelXPool[Math.round(Math.random() * travelXPool.length)];
    let travelY = travelYPool[Math.round(Math.random() * travelYPool.length)];

    try {
        let toX = from.x;
        let toY = from.y;
        for (i = 0; i < travelX.length; i++) {
            let v = travelX[i];
            let yIdx = parseInt(i / (travelX.length / travelY.length))

            await page.mouse.move(
                toX = toX + v + Math.round(Math.random() * 6 - 2),
                toY = toY + yDirection * travelY[yIdx],
                { steps: baseV }
            )
            console.log(toX, toY);
        }

        await page.mouse.move(
            from.x + width + Math.round(Math.random() * 3),
            toY + yDirection * Math.round(Math.random() * 10),
            { steps: 3 }
        );

        //drop
        await page.waitForTimeout(Math.round(Math.random() * 600));
    } catch (e) {

    }
    await page.mouse.up();
}

module.exports = { dragAndDrop, slideAndDropV1, slideAndDrop };
