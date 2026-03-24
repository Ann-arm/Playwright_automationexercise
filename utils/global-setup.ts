import { FullConfig, chromium, selectors } from "@playwright/test";
import LoginPage from '../pages/login.page';

async function globalSetup(config: FullConfig) {

    // Встановлюємо testId атрибут глобально для selectors
    selectors.setTestIdAttribute('data-qa');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        baseURL: 'https://www.automationexercise.com'
    });
    await context.storageState({ path: 'notLoggedInState.json' });

    await context.route('**/*ads*', route => route.abort());

    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(loginPage.emailForLogin, loginPage.passwordForLogin);

    await context.storageState({ path: 'loggedInState.json' });
    await browser.close();
}

export default globalSetup;