import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly inventoryContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    }

    async goToLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginSuccess() {
        await expect(this.page).toHaveURL(/inventory\.html$/);
        await expect(this.inventoryContainer).toBeVisible();
    }

    async expectLoginError(
        expectedMessage = 'Epic sadface: Username and password do not match any user in this service'
    ) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}
