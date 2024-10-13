// const { chromium } = require('playwright');
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('link', { name: '日本語 1,427,000+ 記事' }).click();
  await page.getByText('選り抜き記事').click();
  await page.getByRole('link', { name: 'ノーマ・マリー・タルマッジ' }).click();
  await page.getByRole('link', { name: 'ノーマ・マリー・タルマッジ', exact: true }).click();

  // ---------------------
  await context.close();
  await browser.close();
})();