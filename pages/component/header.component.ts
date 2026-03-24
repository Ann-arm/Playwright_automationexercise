import { Page, Locator,  } from '@playwright/test';

export class HeaderComponent {
    private page: Page;
    logoutBtn: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
    }

    checkUserIsLoggedIn(userName: string) {
    const loggedInAsInscription = this.page.getByText(`Logged in as ${userName}`);
    return loggedInAsInscription;
}
}