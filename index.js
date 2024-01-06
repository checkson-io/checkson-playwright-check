const { chromium } = require('playwright');
const fs = require('fs');

const { CHECKSON_DIR } = process.env;
const USERNAME = process.env.USERNAME || 'student';
const PASSWORD = process.env.PASSWORD || 'Password123';

(async () => {
    const browser = await chromium.launch({
        headless: true, // Playwright uses `true` for headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const attachmentsDir = `${CHECKSON_DIR}/attachments`;
    if (!fs.existsSync(attachmentsDir)){
        fs.mkdirSync(attachmentsDir);
    }
    const screenshotFilePath = `${attachmentsDir}/screenshot.jpg`;

    const page = await browser.newPage();
    await page.setDefaultTimeout(5000);

    let loginSuccessful = false;

    try {

        await page.setViewportSize({ width: 1280, height: 800 });

        const website_url = 'https://practicetestautomation.com/practice-test-login/';

        await page.goto(website_url);
        await page.fill('#username', USERNAME);
        await page.fill('#password', PASSWORD);
        await page.click('button[id=submit]');

        await page.waitForSelector('//*[contains(text(), "Logged In Successfully")]');
        await page.getByText('Logged In Successfully')
        await expect(element !== undefined ).toBeTruthy();

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

    fs.writeFileSync(`${CHECKSON_DIR}/message`, message);

    const exitCode = loginSuccessful ? 0 : 1;
    process.exit(exitCode);
})();

