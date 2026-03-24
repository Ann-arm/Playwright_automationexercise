import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ context, page }) => {
        homePage = new HomePage(page);
        //заблокувала рекламу
        await context.route('**/*ads*', route => route.abort());
    });

    test('Open HomePage and verify the title', async ({ page }) => {
        homePage = new HomePage(page);
        //open URL
        // await page.goto('https://www.automationexercise.com/');
        await homePage.navigateToHomePage();

        //verify the title
        await expect(page).toHaveTitle('Automation Exercise');
    });

    test('Open Products page and verify the title', async ({ page }) => {
        await page.goto('/products');
        await expect(page).toHaveTitle('Automation Exercise - All Products');
    });

    test('Click Test Cases button', async ({ page }) => {
        // await page.goto('https://www.automationexercise.com/');
        await homePage.navigateToHomePage();

        //click the button
        // await page.locator("//div[@class='item active']//button[contains(text(), 'Test Cases')]").click();
        await homePage.testCasesBtn.click();

        //verify another page opens
        await expect(page).toHaveURL('/test_cases');
        // await expect(page).toHaveURL(/.*test_cases/);
    });

    test('Verify Category text is visible', async ({ page }) => {
        // await page.goto('https://www.automationexercise.com/');
        await homePage.navigateToHomePage();

        const headingText = homePage.headingText;

        //текст повинен бути унікальний, щоб це спрацювало
        await expect(headingText).toBeVisible();
        // await expect(page.getByText("Category", { exact: true })).toBeVisible();
    })

    test('Verify Home link is enable', async ({ page }) => {
        // await page.goto('https://www.automationexercise.com/');
        await homePage.navigateToHomePage();

        // >> — це selector chaining operator. Знайди елемент всередині іншого елемента
        // const homeText = await page.locator("#header >> text=Home");

        // const homeText = await page.locator('#header').locator('text=Home');
        const homeText = homePage.homeText;

        //текст повинен бути унікальний, щоб це спрацювало
        await expect(homeText).toBeEnabled();
        // await expect(page.getByText("Category", { exact: true })).toBeVisible();
    })

    test('Verify Home icon is enable', async ({ page }) => {
        // await page.goto('https://www.automationexercise.com/');
        await homePage.navigateToHomePage();

        // const homeIcon = page.locator("//*[@id='header']//*[@class='fa fa-home']");
        const homeIcon = homePage.homeIcon;

        await expect(homeIcon).toBeVisible();
    })

    test('Verify text of all nav links', async ({ page }) => {
        const expectedLinks = [
            "Home",
            "Products",
            "Cart",
            "Signup / Login",
            "Test Cases",
            "API Testing",
            "Video Tutorials",
            "Contact us"
        ]

        // await page.goto('https://www.automationexercise.com/');
        await homePage.navigateToHomePage();

        expect(homePage.getNavBarText()).toEqual(expectedLinks[1]);
    })
})