import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from './component/header.component';

export abstract class BasePage {
    protected page: Page;
    readonly header: HeaderComponent;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
    }

    async open(path: string) {
        await this.page.goto(path);
    }

    async clickBtn(button: Locator) {
        await button.click();
    }
}