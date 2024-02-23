import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const { CHECKSON_DIR } = process.env;
const USERNAME = process.env.LOGIN_USERNAME || 'student';
const PASSWORD = process.env.LOGIN_PASSWORD || 'Password123';
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://practicetestautomation.com/practice-test-login/';
const USERNAME_SELECTOR = process.env.USERNAME_SELECTOR || '#username';
const PASSWORD_SELECTOR = process.env.PASSWORD_SELECTOR || '#password';
const SUBMIT_SELECTOR = process.env.SUBMIT_SELECTOR || '#submit.btn';
const MESSAGE_SELECTOR = process.env.MESSAGE_SELECTOR || '#loop-container > div > article > div.post-header > h1';
const MESSAGE_TEXT = process.env.MESSAGE_TEXT || 'Logged In Successfully';

(async () => {
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const attachmentsDir = `${CHECKSON_DIR}/attachments`;
    if (!existsSync(attachmentsDir)){
        mkdirSync(attachmentsDir);
    }
    const screenshotFilePath = `${attachmentsDir}/screenshot.jpg`;

    const page = await browser.newPage();
    page.setDefaultTimeout(5000);

    let loginSuccessful = false;

    try {

        await page.setViewportSize({ width: 1280, height: 1200 });

        await page.goto(WEBSITE_URL);
        await page.fill(USERNAME_SELECTOR, USERNAME);
        await page.fill(PASSWORD_SELECTOR, PASSWORD);
        await page.click(SUBMIT_SELECTOR);

	await page.$eval(MESSAGE_SELECTOR, (el, text) => el.value === text, MESSAGE_TEXT);

        await page.screenshot({ path: screenshotFilePath });
        loginSuccessful = true;
    } catch (error) {
        console.log(error);

        await page.screenshot({ path: screenshotFilePath });
    }

    await browser.close();

    const message = loginSuccessful
        ? 'Login successful, see attached screenshot'
        : 'Login failed, see attached screenshot';

    console.log(message);

    writeFileSync(`${CHECKSON_DIR}/message`, message);

    const exitCode = loginSuccessful ? 0 : 1;
    process.exit(exitCode);
})();

