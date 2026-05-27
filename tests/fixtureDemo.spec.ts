import { test } from "@playwright/test";

test("Test1", async ({ page }) => {
    console.log("This is my first test");
    await page.goto("https://www.playwright.dev");
});

test("Test2", async ({ page }) => {
    console.log("This is my second test");
    await page.goto("https://www.saucedemo.com");
});