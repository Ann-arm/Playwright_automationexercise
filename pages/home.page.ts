import { Page, Locator } from "@playwright/test";

class HomePage {
    page: Page;
    testCasesBtn: Locator;
    headingText: Locator;
    homeText: Locator;
    homeIcon: Locator;
    navBarText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.testCasesBtn = page.locator("//div[@class='item active']//button[contains(text(), 'Test Cases')]");
        this.headingText = page.locator("text=Category");
        this.homeText = page.locator('#header').getByText('Home');
        this.homeIcon = page.locator("//*[@id='header']//*[@class='fa fa-home']");
        this.navBarText = page.locator('//*[@class="nav navbar-nav"]/li/a');

    };

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async getNavBarText() {
        // Знаходимо всі посилання
        // const navBarText = page.locator('//*[@class="nav navbar-nav"]/li/a');
        // const navBarText = await homePage.navBarText;
        //якщо хочемо взяти елемент по індексу
        // const navBarText = page.locator('//*[@class="nav navbar-nav"]/li/a').nth(1);

        // print out text of all navBar elements
        for(const el of await this.navBarText.elementHandles()){
            console.log(await el.textContent());
        }

        // Отримуємо "сирий" текст (з пробілами та іконками всередині)
        const navTexts = await this.navBarText.allTextContents();

        // ОЧИЩЕННЯ: прибираємо пробіли з обох боків (.trim()) 
        // і видаляємо все, що не є звичайним текстом (якщо іконки заважають)
        const cleanedTexts = navTexts.map((text: string) => text.trim().replace(/[^a-zA-Z0-9\s\/\\]/g, '').trim());
        // .replace(/[^a-zA-Z0-9\s\/\\]/g, '') — цей регулярний вираз видалить той дивний символ 
        return cleanedTexts;
    }
}

export default HomePage;