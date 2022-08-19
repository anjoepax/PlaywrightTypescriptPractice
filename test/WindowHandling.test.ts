import { Browser, BrowserContext, chromium, Page } from "playwright";


describe('Window handling test', () => {

    let browser:Browser
    let context:BrowserContext
    let page:Page

    beforeAll(async () => {
        browser = await chromium.launch({headless:false, slowMo:400})
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto("https://letcode.in/windows")
    })

    test('Home page', async () => {
        console.log(await page.title())
        expect(await page.title()).toBe("Window handling - LetCode")
    })

    xtest('Single page handling', async () => {
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#home")
        ])
        await newWindow.waitForLoadState("domcontentloaded")
        expect(newWindow.url()).toContain("test")
        await newWindow.click('"Log in"')
        //await newWindow.waitForNavigation()
        expect(newWindow.url()).toContain("signin")
        //await newWindow.close()
        await page.bringToFront()
        await page.click('"LetXPath"')
    })

    test('Multiple window handling', async () => {
        const [multiplePage] = await Promise.all([
            context.waitForEvent("page"),
            await page.click('#multi')
        ])
        await multiplePage.waitForLoadState()
        const pages = multiplePage.context().pages();
        console.log('Window Count: ' + pages.length)
        pages.forEach(page => {
            console.log('URL: ' + page.url())
        })

        await pages[1].bringToFront()
        pages[1].on("dialog", (dialog) => {
            console.log('Message: ' + dialog.message())
            dialog.accept()
        })
        await pages[1].click("id=accept")
    })

    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})