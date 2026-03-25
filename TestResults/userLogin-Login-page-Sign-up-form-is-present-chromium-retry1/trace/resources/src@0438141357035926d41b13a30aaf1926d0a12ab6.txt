import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';

test.describe('Login', () => {
    let loginPage: LoginPage;

    // test.beforeEach(async ({ context, page }) => {
    // await context.route('**/*ads*', route => route.abort());



    // await loginPage.open();
    // await loginPage.login(loginPage.emailForLogin, loginPage.passwordForLogin);

    // await expect(loginPage.header.logoutBtn).toBeVisible();
    // })

    // test('Login', async () => {

    //     await loginPage.open();
    //     await loginPage.login(loginPage.emailForLogin, loginPage.passwordForLogin);

    //     await expect(loginPage.header.logoutBtn).toBeVisible();
    // })

    test('Logged in as inscription is present', async ({ page }) => {
        loginPage = new LoginPage(page);

        await page.goto('/');
        await expect(loginPage.header.checkUserIsLoggedIn('Adaline')).toBeVisible();
    })
})

test.describe('Login page', () => {
    let loginPage: LoginPage;

    test.use({ storageState: 'notLoggedInState.json' });

    test('Sign up form is present', async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.open();
        await expect(loginPage.signUpBth).toBeVisible();
    })
})
