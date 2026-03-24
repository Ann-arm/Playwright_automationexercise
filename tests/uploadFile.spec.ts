import { test } from '@playwright/test';
const path = require('path');

test.describe('Upload file', () => {

    test.beforeEach(async ({ context }) => {
        await context.route('**/*ads*', route => route.abort())
    })

    test('Upload a test file on Contact us page', async ({ page }) => {
        await page.goto('/contact_us');

        const filePath = path.join(__dirname, '../data/imageForTest.JPG');

        const fileInput = '[name="upload_file"]';

        // // DOM manipulations
        // await page.evaluate((selector) => {
        //     const element = document.querySelector(selector);
        //     if (element) {
        //         element.className = '';
        //     }
        // }, fileInput);

        await page.setInputFiles(fileInput, filePath);
    })
})