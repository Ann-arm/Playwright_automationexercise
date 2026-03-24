import { test, expect } from '@playwright/test';

test.describe('Homework One', () => {
    test.beforeEach(async ({ context }) => {
        await context.route('**/*ads*', route => route.abort())
    })

    test('Submit Contact form', async ({ page }) => {
        await page.goto('/contact_us');

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

    test('Check the length of Feedback block', async ({ page }) => {
        const expectedTexts = [
            "We really appreciate your response to our website.",
            "Kindly share your feedback with us at feedback@automationexercise.com.",
            "If you have any suggestion areas or improvements, do let us know. We will definitely work on it.",
            "Thank you",
        ];

        await page.goto('/contact_us');

        const sentencesList = page.locator('[class="contact-info"] address p');

        for (const el of await sentencesList.elementHandles()) {
            const text = (await el.textContent()) ?? ""; // Якщо null, стане ""
            expect(text.length).toBeGreaterThan(8);
        }

        const texts = await sentencesList.allTextContents();

        expect(texts).toEqual(expectedTexts);
        expect(await sentencesList.count()).toEqual(4);

    })
})