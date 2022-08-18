import { chromium } from "playwright";


describe('Upload File Test', () => {

    const filePath0 = '../PlaywrightTypescript/videos/a.webm';
    const filePath1 = '../PlaywrightTypescript/videos/b.webm';

    xtest('Upload File', async () => {
        const browser = await chromium.launch({ headless: false, slowMo: 100 })

        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://sendgb.com/')

        //await page.locator("input[name='qqfile']").setInputFiles(filePath0)
        await page.locator("input[name='qqfile']").setInputFiles([filePath0, filePath1])

        await page.close()
        await context.close()
        await browser.close()
    })

    test('Upload Without Input Tag', async () => {
        const browser = await chromium.launch({ headless: false, slowMo: 100 })

        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://the-internet.herokuapp.com/upload')

        page.on("filechooser", async (filechooser) => {
            // await filechooser.isMultiple();
            await filechooser.setFiles([filePath0, filePath1])
        })
        await page.locator(".example + div#drag-drop-upload").click({force:true})

        // await page.close()
        // await context.close()
        // await browser.close()
    })
})