import { expect, test } from '../../fixtures/baseFixture';
import { formatAccessibilityViolations } from '../../utils/accessibilityHelper';

test.describe('Accessibility checks - login form', () => {
    test('Sauce Demo login form has no critical or serious Axe violations', async (
        { loginPage, accessibilityScanner },
        testInfo
    ) => {
        await loginPage.goToLoginPage();

        /*
         * Automated Axe checks can detect issues such as missing labels,
         * color contrast problems, invalid ARIA usage, and broken semantic structure.
         * They do not replace manual checks for keyboard navigation, focus order,
         * screen reader behavior, and the real user experience.
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
