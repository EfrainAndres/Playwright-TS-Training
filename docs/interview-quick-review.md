# Interview Quick Review

## 60-Second Pitch

I am an SDET with strong hands-on experience in automation, especially WebdriverIO, Appium, mobile testing, API validation, regression testing, defect analysis, and troubleshooting. I have worked with developers and CI/CD processes to improve coverage, investigate failures, and provide clear defect evidence.

My strongest production experience is WebdriverIO and Appium, but the automation concepts transfer well to Playwright: stable locators, reusable page objects, fixtures, API setup, data-driven testing, reporting, and debugging. To prepare for this role, I built a Playwright TypeScript framework with UI, API, accessibility, fixtures, POM, test data, and GitHub Actions. I can ramp up quickly because I understand the quality engineering principles behind the tools.

## Strongest Positioning Statement

My strongest value is combining practical automation experience with senior-level troubleshooting and ownership. I may be ramping up on Playwright, Axe, GitHub Actions, and K6, but I already understand how to design maintainable tests, investigate failures, communicate risk, and collaborate with engineering teams.

## 10 Most Likely Questions

### 1. What is your experience with Playwright?

My deepest experience is WebdriverIO/Appium, but I recently built a Playwright TypeScript framework with UI, API, accessibility, fixtures, POM, data-driven tests, and CI. The core automation concepts transfer well.

### 2. How would you design an automation framework?

Separate responsibilities: `tests/ui`, `tests/api`, `tests/accessibility`, `pages`, `fixtures`, `utils`, `test-data`, `docs`, and CI workflows. Keep it simple, readable, and easy for the team to extend.

### 3. Why use Page Object Model?

POM centralizes selectors and user actions. Tests become more readable, and selector changes are fixed in one place instead of many tests.

### 4. What are Playwright fixtures?

Fixtures provide reusable typed setup. In my framework, `baseFixture.ts` injects `loginPage`, `apiHelper`, and `accessibilityScanner`, which reduces duplication.

### 5. How do you avoid flaky Playwright tests?

Use stable locators, web-first assertions, auto-waiting, independent test data, API setup/cleanup, and avoid fixed waits. Debug with traces, screenshots, videos, console logs, and network logs.

### 6. How do API tests complement UI tests?

API tests are faster and less flaky. They validate backend behavior directly and can also create or clean up data for UI tests, keeping UI tests focused on user workflows.

### 7. What do you validate in API testing?

Status codes, response body, headers, schema, auth behavior, error handling, negative scenarios, and data created or updated through GET, POST, PUT, PATCH, and DELETE.

### 8. How did you implement accessibility testing?

I used Axe with Playwright to scan rendered pages, filter critical and serious WCAG-related violations, format readable reports, and attach violation details to Playwright output.

### 9. What does Axe not cover?

Axe does not replace manual testing. I would still validate keyboard navigation, focus order, screen reader behavior, meaningful alt text, modal behavior, and real user experience.

### 10. What is your K6 experience?

My K6 knowledge is basic to intermediate. I understand VUs, checks, thresholds, p95, smoke, load, stress, and spike tests. I would start with lightweight API performance smoke tests and run heavier tests on schedule or pre-release.

## Key Technical Terms

- Playwright locators: `getByRole`, `getByLabel`, `getByTestId`, `data-test`
- Auto-waiting
- Web-first assertions
- Browser context
- Trace Viewer
- Screenshots and videos
- Page Object Model
- Typed fixtures
- APIRequestContext
- Test data setup/cleanup
- JSON schema, AJV, Zod
- Contract testing, Pact
- Axe, WCAG, critical/serious violations
- Keyboard navigation and focus order
- GitHub Actions
- `npm ci`
- Playwright browser install
- Matrix builds
- Sharding
- Parallel execution
- CI artifacts
- K6 virtual users
- Checks and thresholds
- p95 response time
- Flaky test root cause analysis

## 5 Questions To Ask The Interviewer

1. What is the current maturity of the Playwright framework?
2. How do you split smoke, regression, API, accessibility, and performance tests in CI?
3. How is flakiness tracked, prioritized, and owned?
4. Are Axe, Evinced, or K6 already implemented, or would this role help build that strategy?
5. What would success look like for this role in the first 90 days?

## Final Reminder

Be honest and confident: "My strongest hands-on experience is WebdriverIO/Appium, but I recently prepared a Playwright TypeScript framework and the automation architecture concepts transfer directly."
