import { Browser, BrowserContext, chromium, Page, devices } from "playwright";


describe('Input Field Test', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;


    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
            slowMo: 100
        });
        const desktop = devices['Desktop Chrome'];
        context = await browser.newContext({...desktop})
        page = await context.newPage()
        await page.goto("https://letcode.in/edit")
    })

    test("Enter your full name", async () => {
        //await page.locator("id=fullName").type("AJ Blues")
        const name = await page.$('#fullName')
        await name?.type('AJ Blues')
    })

    test('Append a text and press keyboard tab', async () => {
        const join = await page.$('#join')
        await join?.focus()
        await page.keyboard.press("End")
        await join?.type(" Human")
    })

    test('What is inside the text box', async () => {
        const textValue = await page.locator("#getMe").getAttribute("value")
        console.log(textValue)
    })

    test('Clear text', async () => {
        await page.locator("//input[@value='Koushik Chatterjee']").fill("")
    })

    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})