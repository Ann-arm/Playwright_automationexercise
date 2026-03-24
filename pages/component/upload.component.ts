import { Page, Locator } from '@playwright/test';

class UploadComponent {
    private page: Page;
    fileInput: string;
    // submitBtn: Locator;
    // successTxt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = '[name="upload_file"]';
        // this.submitBtn = page.locator('#upload_1')
        // this.successTxt = page.locator('#wfu_messageblock_header_1_1')
    }

    async uploadFile(filePath: string) {
        await this.page.setInputFiles(this.fileInput, filePath);
    }
}

export default UploadComponent;