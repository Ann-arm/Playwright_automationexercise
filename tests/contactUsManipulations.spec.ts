import { test, expect } from '@playwright/test';
import ContactUsPage from '../pages/contactUs.page';
import { faker } from '@faker-js/faker';

test.describe('Homework One', () => {
    let contactUsPage: ContactUsPage;

    test.beforeEach(async ({ context, page }) => {
        await context.route('**/*ads*', route => route.abort())

        contactUsPage = new ContactUsPage(page);

        await page.goto('/contact_us');
    })

    test('Submit Contact form', async () => {

        await contactUsPage.submitForm(faker.person.fullName({sex: "female"}), faker.internet.email(), faker.lorem.sentence(), faker.lorem.text());

        await expect(contactUsPage.successNotification)
            .toHaveText("Success! Your details have been submitted successfully.", { timeout: 10000 });
    })

    test('Check the length of Feedback block', async () => {

        await contactUsPage.checkLengthOfFeedbackBlock();

        expect(await contactUsPage.sentencesList.count()).toEqual(4);
    })

})