const { test, expect } = require('@playwright/test');

test('Pos_UI_0001: Sinhala output updates automatically in real-time', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();

    // 1. Force a click to ensure the website is listening
    await inputArea.click();
    
    // 2. Clear any previous data
    await inputArea.fill('');

    // 3. Use pressSequentially with a longer delay (200ms) to mimic a real human
    // This is the most important step for UI real-time tests!
    await inputArea.pressSequentially('ovuhu raajakaari saDHAhaa pitavagos sitiyooya.', { delay: 200 });

    // 4. Increase the timeout to 15 seconds to give the engine more time
    await expect(outputDiv).not.toBeEmpty({ timeout: 15000 });

    const actualOutput = await outputDiv.innerText();
    console.log(`UI TC Result: ${actualOutput}`);

    await page.screenshot({ path: 'screenshots/Pos_UI_0001.png' });
    expect(actualOutput.trim()).toBe('ඔවුහු රාජකාරි සඳහා පිටවගොස් සිටියෝය.');
});