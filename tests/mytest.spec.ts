import {test, expect} from "@playwright/test";

test("my first test", async ({ page }) => {
    await page.goto("https://www.google.com");
    const searchBox = page.locator("textarea[name='q']");

    await searchBox.fill("Playwright testing");

    await expect(searchBox).toHaveValue("Playwright testing");
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/q=Playwright(\+|%20)testing/);
});
