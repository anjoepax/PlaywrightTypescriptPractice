import { Browser, BrowserContext, chromium, Page } from "playwright";

describe('Handling Dropdown Test', () => {

    let browser: Browser
    let context: BrowserContext
    let page: Page

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
            slowMo: 500
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://letcode.in/dropdowns")
    })

    test('Select a dropdown based on value', async () => {
        const fruits = await page.$('#fruits')
        await fruits?.selectOption("2")
        const msg = await page.$("div.notification.is-success")
        if(msg) {
            expect(await msg.textContent()).toContain('Orange');
        }
    })

    test('Select multiple dropdown', async () => {
        const heros = await page.$('#superheros')
        await heros?.selectOption([
            {label:"Aquaman"},
            {value:"bt"},
            {index: 8}
        ])
    })


    test('Count of all values available in dropdown', async () => {
        const language = await page.$$("#lang option")
        console.log(language.length)
    })


    test('Get selected text', async () => {
        await page.selectOption("#country", "India")
        const country = await page.$eval<string, HTMLSelectElement>("#country", ele => ele.value)
        console.log(country)
        expect(country).toBe("India")
    })

    afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
    })
})