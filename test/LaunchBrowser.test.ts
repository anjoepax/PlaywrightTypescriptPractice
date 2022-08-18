import {chromium} from "playwright";


describe('Launch Browser', () => {

    test('Open Letcode', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext()
        let page = await context.newPage()
        await page.goto('https://letcode.in/')
        await browser.close()
    })
})

