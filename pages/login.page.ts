import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';

class LoginPage extends BasePage {

    emailAddressInput: Locator;
    passwordInput: Locator;
    loginBtn: Locator;
    signUpBth: Locator;

    readonly emailForLogin: string = 'adeline@gm.com';
    readonly passwordForLogin: string = '123456';

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.emailAddressInput = page.getByTestId('login-email');
        this.passwordInput = page.getByTestId('login-password');
        this.loginBtn = page.getByTestId('login-button');
        this.signUpBth = page.getByTestId('signup-button');
    }

    async open() {
        /**Коли ми викликаємо open() саме у LoginPage, 
        він знає, що треба йти саме на /login **/
        await super.open('/login');
    }

    async login(email: string, pass: string) {

        // good practice, to wait for element
        await expect(this.emailAddressInput).toBeVisible();

        await this.emailAddressInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginBtn.click();



    }
}

export default LoginPage;