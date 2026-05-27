import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { readCSV } from "../utils/csvReader";

const loginData = readCSV("test-data/loginData.csv");    

loginData.forEach((data: any) => {
    if (!data.run) return; // Skip tests where run is false
    test(`login test ${data.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goToLoginPage();
        await loginPage.login(data.username, data.password);

        if (data.expected === "success") {
            await expect(page).toHaveURL(/inventory\.html$/);
        } else {
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
        }
    });
});