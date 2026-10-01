import { test, expect } from '@playwright/test';

test.describe('InsureFlow Login Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('http://localhost:3000');
  });

  test('should successfully log in with valid credentials', async ({ page }) => {
    // 1. Fill in the email
    await page.getByTestId('input-email').fill('admin@insureflow.com');
    
    // 2. Fill in the password
    await page.getByTestId('input-password').fill('password123');
    
    // 3. Click the login button
    await page.getByTestId('btn-login').click();

    // 4. Wait for the redirect and assert we reached the dashboard
    // The app has a simulated API delay, so Playwright will automatically wait for the URL to change
    await expect(page).toHaveURL('http://localhost:3000/dashboard');

    // 5. Assert that a dashboard element is visible to confirm successful load
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Total Premium')).toBeVisible();
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    // 1. Fill in wrong credentials
    await page.getByTestId('input-email').fill('wrong@email.com');
    await page.getByTestId('input-password').fill('badpassword');
    
    // 2. Click login
    await page.getByTestId('btn-login').click();

    // 3. Assert that the error banner appears
    const errorBanner = page.getByTestId('login-error');
    await expect(errorBanner).toBeVisible();
    await expect(errorBanner).toContainText('Invalid credentials');
    
    // 4. Assert we are still on the login page
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByTestId('input-password');
    const toggleBtn = page.getByTestId('btn-toggle-password');

    // Type a password
    await passwordInput.fill('secretpassword');

    // By default, it should be type="password"
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click the toggle visibility button (eye icon)
    await toggleBtn.click();

    // It should change to type="text"
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });
});