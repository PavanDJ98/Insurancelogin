import{test, expect} from '@playwright/test';

test('Locators',async ({page}) =>
{

await page.goto('https://www.demoblaze.com/index.html')

//click on login button. --property 

//await page.locator('id=login2').click()
await page.click('id=login2')

//provide user name

await page.locator('#loginusername').fill("pavan19982")
await page.locator("//input[@id = 'loginpassword']").fill("pavan123")

//click on login button 

await page.click("//button[normalize-space()='Log in']")

//logout link presence 

 const logoutlink = await page.locator("(//a[normalize-space()='Log out'])[1]")

await expect(logoutlink).toBeVisible();

await page.close();

}
)