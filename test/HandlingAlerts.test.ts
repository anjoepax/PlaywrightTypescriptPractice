import {Browser, BrowserContext, chromium, Page} from "playwright";


describe('Handling Alerts Test', () => {

    let browser : Browser
    let context : BrowserContext
    let page : Page

    beforeAll(async () => {
        browser = await chromium.launch({headless:false})
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto('https://letcode.in/alert')
    })

    test('Handle the dialogs', async () => {
        const element = await page.$("#prompt")
        page.on("dialog", (dialog) => {
            console.log('Message: ' + dialog.message())
            console.log('Default Value: ' + dialog.defaultValue())
            console.log('Type: ' + dialog.type())
            dialog.accept("Hello AJ")
            //dialog.dismiss()
        })
        await element?.click()
    })

    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})
