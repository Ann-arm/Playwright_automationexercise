import { Page, Locator, expect } from '@playwright/test';
import UploadComponent from './component/upload.component';

class ContactUsPage {
    private page: Page;
    nameInput: Locator;
    emailInput: Locator;
    subjectInput: Locator;
    messageInput: Locator;
    submitBtn: Locator;
    successNotification: Locator;
    sentencesList: Locator;

    constructor(page: Page) {
        this.page = page
        this.nameInput = page.getByTestId('name');
        this.emailInput = page.getByTestId('email');
        this.subjectInput = page.getByTestId('subject');
        this.messageInput = page.getByTestId('message');
        this.submitBtn = page.getByTestId('submit-button');
        this.successNotification = page.locator('//*[@class="status alert alert-success"]');
        this.sentencesList = page.locator('[class="contact-info"] address p');
    }

    async submitForm(name: string, email: string, subject?: string, message?: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        if (subject) {
            await this.subjectInput.fill(subject);
        }
        if (message) {
            await this.messageInput.fill(message);
        }

        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await this.submitBtn.click();

        await this.successNotification
            .waitFor({ state: "visible", timeout: 10000 });
    }

    async checkLengthOfFeedbackBlock() {
        const texts = await this.sentencesList.allTextContents();

        for (const text of texts) {
            // .trim() видаляє зайві пробіли на початку та в кінці
            expect(text.trim().length).toBeGreaterThan(8);
        }
    }

    uploadComponent() {
        return new UploadComponent(this.page);
    }
}

export default ContactUsPage;