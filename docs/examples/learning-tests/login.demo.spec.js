import {test, expect}  from "@playwright/test";

test("login test", async ({ page }) => {
    
    await page.goto("https://www.saucedemo.com/");

    const usernameInput = page.locator("#user-name");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#login-button");

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    await usernameInput.fill("standard_user");
    await passwordInput.fill("secret_sauce");
    await loginButton.click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    const title = await page.title();
    await expect(title).toBe("Swag Labs");
});
