import { test, expect } from '@playwright/test';

test.describe('Debugging', () => {

    test.beforeEach(async ({ context }) => {
        //заблокувала рекламу
        await context.route('**/*ads*', route => route.abort());
    });

test('Click Test Cases button', async ({ page }) => {
        await page.goto('/');

        //click the button
        await page.locator('.item.active').getByRole('button', { name: 'Test Cases' }).click();

        //verify another page opens
        await expect(page).toHaveURL('/test_cases');
        // await expect(page).toHaveURL(/.*test_cases/);
    });

 test('Submit Contact form', async ({ page }) => {
        await page.goto('/contact_us');

        // await page.pause();

        //  вказала в конфігах, що testIdAttribute: 'data-qa'
        const nameInput = page.getByTestId('name');
        const emailInput = page.getByTestId('email');
        const subjectInput = page.getByTestId('subject');
        const messageInput = page.getByTestId('message');
        const submitBtn = page.getByTestId('submit-button');
        const successNotification = page.locator('//*[@class="status alert alert-success"]');

        await nameInput.fill("Ann");
        await emailInput.fill("annTest@gm.com");
        await subjectInput.fill("Question");
        await messageInput.fill("Can you send me your address?");

        page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await submitBtn.click();

        //hardcode sleep - WRONG WAY
        // await page.waitForTimeout(5000);

        //condition wait
        await successNotification
            .waitFor({ state: "visible", timeout: 10000 });

        await expect(successNotification)
            .toHaveText("Success! Your details have been submitted successfully.", {timeout: 10000});
    })
})