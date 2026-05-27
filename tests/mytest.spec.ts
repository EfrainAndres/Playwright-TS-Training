import {test, expect} from "@playwright/test";

test("my first test", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.getByRole("button", { name: /Search/ }).click();
    const searchBox = page.locator("#docsearch-input");

    await searchBox.fill("Playwright testing");

    await expect(searchBox).toHaveValue("Playwright testing");
});
