import { expect, test } from '../../fixtures/baseFixture';
import { formatAccessibilityViolations } from '../../utils/accessibilityHelper';

test.describe('Accessibility checks - home page', () => {
    test('Playwright home page has no critical or serious Axe violations', async (
        { page, accessibilityScanner },
        testInfo
    ) => {
        await page.goto('https://playwright.dev/');

        /*
         * Axe scans the rendered page for common accessibility problems.
         * We scan important pages early because accessibility issues are cheaper to fix
         * when they are caught during regular automated test runs.
         */
        const violations = await accessibilityScanner({
            tags: ['wcag2a', 'wcag2aa'],
        });

        if (violations.length > 0) {
            const report = formatAccessibilityViolations(violations);

            console.log(report);
            await testInfo.attach('accessibility-violations', {
                body: report,
                contentType: 'text/plain',
            });
        }

        expect(violations, formatAccessibilityViolations(violations)).toHaveLength(0);
    });
});
