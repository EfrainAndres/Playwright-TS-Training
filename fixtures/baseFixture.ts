import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ApiHelper } from '../utils/apiHelper';
import {
    checkAccessibility,
    type AccessibilityOptions,
    type AccessibilityViolation,
} from '../utils/accessibilityHelper';

type Fixtures = {
    loginPage: LoginPage;
    apiHelper: ApiHelper;
    accessibilityScanner: (options?: AccessibilityOptions) => Promise<AccessibilityViolation[]>;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    apiHelper: async ({ request }, use) => {
        await use(new ApiHelper(request));
    },

    accessibilityScanner: async ({ page }, use) => {
        await use((options) => checkAccessibility(page, options));
    },
});

export { expect };
