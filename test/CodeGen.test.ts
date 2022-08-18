import { chromium } from "playwright";


describe('Launch Browser', () => {

    test('Recorded Script', async () => {

        const browser = await chromium.launch({
            headless: false,
            slowMo: 100
        })

        const context = await browser.newContext({
            recordVideo: {
                dir: "./videos/",
                size: {
                    width: 800,
                    height: 600
                }
            }
        })

        let page = await context.newPage()


        await page.goto('https://letcode.in/');
        
        await page.locator('text=Log in').click();

        await page.locator('text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]').click();
        await page.locator('text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]').fill('koushik350@gmail.com');
        
        await page.locator('text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]').press('Tab');
        
        await page.locator('[placeholder="Enter password"]').fill('Pass123$');
        
        await page.locator('[placeholder="Enter password"]').press('Enter');
        
        await page.locator('text=Explore Workspace').click();
        
        await page.locator('text=All in One').click();
    
        await page.locator('#firstname').click();
        await page.locator('#firstname').fill('AJ');
        
        await page.locator('#lasttname').click();
        await page.locator('#lasttname').fill('Blues');

        await page.locator('[placeholder="Email input"]').click();
        await page.locator('[placeholder="Email input"]').fill('ajblues@gmail.com');
        
        await page.locator('[placeholder="Email input"]').press('Tab');
        await page.locator('text=Country codeUSA (+1)UK (+44)Other CountriesAlgeria (+213)Andorra (+376)Angola (+ >> select').selectOption('63');
       
        await page.locator('[placeholder="Phone Number"]').click();
        await page.locator('[placeholder="Phone Number"]').fill('9356086041');
        
        await page.locator('[placeholder="Address Line-1"]').click();
        await page.locator('[placeholder="Address Line-1"]').fill('Address Line 1');
        
        await page.locator('[placeholder="Address Line-2"]').click();
        await page.locator('[placeholder="Address Line-2"]').fill('Address Line 2');
        
        await page.locator('[placeholder="State"]').click();
        await page.locator('[placeholder="State"]').fill('State');
        
        await page.locator('[placeholder="Postal-Code"]').click();
        await page.locator('[placeholder="Postal-Code"]').fill('6040');
        
        await page.locator('text=CountryAfghanistanÅland IslandsAlbaniaAlgeriaAmerican SamoaAndorraAngolaAnguilla >> select').selectOption('Philippines');
        await page.locator('input[name="dob"]').fill('1995-12-10');
       
        await page.locator('text=Male').first().click();
        await page.locator('input[type="submit"]').click();
       
        await page.locator('text=I agree to the terms and conditions').click();
       
        await page.locator('text=Sign out').click();

        await page.close();
        await context.close();
        await browser.close();
    })
})