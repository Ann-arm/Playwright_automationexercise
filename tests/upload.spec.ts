import { test } from '@playwright/test';
import ContactUsPage from '../pages/contactUs.page';
import path from 'path';

test.describe('Upload File', () => {
  let contactUsPage: ContactUsPage;

  test.beforeEach(async ({ context, page }) => {
    //block ads
    await context.route('**/*ads*', route => route.abort());

    contactUsPage = new ContactUsPage(page);
  });

  const fileName = ["imageForTest.JPG", "file-1.pdf"];

  fileName.forEach((name) => {
    test(`Upload ${name} file`, async ({ page }) => {
      // Open url
      await page.goto('/contact_us');
      
      // provide test file path
      const filePath = path.join(__dirname, `../data/${name}`);

      // upload test file
      await contactUsPage.uploadComponent().uploadFile(filePath);
    })
  })
// або через цикл for
  // for (const name of fileName) {
  //   test(`Upload ${name} file`, async ({ page }) => {
  //     // Open url
  //     await page.goto('/contact_us');
      
  //     // provide test file path
  //     const filePath = path.join(__dirname, `../data/${name}`);

  //     // upload test file
  //     await contactUsPage.uploadComponent().uploadFile(filePath);
  //   })
  // }

})