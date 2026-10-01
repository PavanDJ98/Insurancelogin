import{test,expect} from '@playwright/test';

test.describe('Login Functionality module',() => {
    test.beforeEach(async ({page})=>
    {
        await page.goto('http://localhost:3000');
    });



    test('Login with valida credentials',async ({page})=>
    {
        await page.getByTestId('input-email').fill('admin@insureflow.com');
        await page.getByTestId('input-password').fill('password123');
        await page.locator("button[type='submit']").click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard');
        
    });

    test('Login with invalid credential',async ({page})=>
    {
        await page.getByTestId('input-email').fill('pavan@gmail.com');
        await page.getByTestId('input-password').fill('password123');
        await page.locator("button[type='submit']").click();
        
        const errormessage = page.getByTestId('login-error');
        await expect(errormessage).toBeVisible();
    }   );
});
