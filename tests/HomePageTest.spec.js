import { test, expect } from '@playwright/test';


test('First PlayWright Test',async ({page})=>
{
    //playwright code -- 
    //step1 - open browser
await page.goto('https://www.demoblaze.com')  ; 


await page.click('id=login2')

const pageTitle = await page.title();

await console.log('page title is:',pageTitle);

await expect(page).toHaveTitle('STORE');


await expect(page)

await page.close();


 //step2 - enter u/p 
    //step3 - click 

}); 