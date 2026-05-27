import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import loginData from "../test-data/loginData.json";

test("Valid login test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(
        loginData.valid_user.username, 
        loginData.valid_user.password
    );
    await expect(page).toHaveURL(/inventory\.html$/);
});

test("Invalid login test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.login(
        loginData.invalid_user.username, 
        loginData.invalid_user.password
    );
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
});
