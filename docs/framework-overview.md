# Playwright TypeScript Study Framework

## Purpose

This repository is a simple interview-practice framework for demonstrating core Senior SDET concepts with Playwright and TypeScript. It is intentionally readable and lightweight rather than a large enterprise framework.

## Folder Structure

```text
tests/
  ui/
    login.spec.ts
    login.data-driven.spec.ts
    fixture-demo.spec.ts
  api/
    posts.api.spec.ts
    api-technical.spec.ts
  accessibility/
    home.a11y.spec.ts
    form.a11y.spec.ts
fixtures/
  baseFixture.ts
pages/
  LoginPage.ts
utils/
  apiHelper.ts
  accessibilityHelper.ts
  csvReader.ts
  dataReader.ts
  excelReader.ts
test-data/
  loginData.json
  loginDataNew.json
  loginData.csv
  loginData.xlsx
docs/
  accessibility-testing.md
  framework-overview.md
  examples/
```

## UI Tests

UI tests live under `tests/ui`. They validate browser behavior only, such as successful login, expected login errors, and data-driven login scenarios for SauceDemo.

## API Tests

API tests live under `tests/api`. They use Playwright `request` to validate REST API behavior such as GET, POST, PUT, PATCH, DELETE, response status codes, and basic response contracts.

## Accessibility Tests

Accessibility tests live under `tests/accessibility`. They use Axe to scan rendered pages for critical and serious accessibility violations. Axe is useful for automated checks, but it does not replace manual testing for keyboard navigation, focus order, screen reader behavior, and real user experience.

## Page Object Model

`pages/LoginPage.ts` centralizes SauceDemo login selectors and actions. Tests call readable methods such as `goToLoginPage()`, `login()`, `expectLoginSuccess()`, and `expectLoginError()` instead of duplicating selectors in every test.

## Fixtures

`fixtures/baseFixture.ts` extends the Playwright test fixture with typed reusable objects:

- `loginPage` creates a `LoginPage` for UI and accessibility tests.
- `apiHelper` creates a reusable API helper for REST tests.
- `accessibilityScanner` wraps the Axe helper for page-level accessibility checks.

This keeps tests cleaner and demonstrates reusable setup without adding unnecessary complexity.

## Data-Driven Testing

`tests/ui/login.data-driven.spec.ts` reads login scenarios from `test-data/loginDataNew.json`. The utilities also show how CSV and Excel data can be read when needed.

## API Helper

`utils/apiHelper.ts` defines the JSONPlaceholder API base URL, simple post payload types, and helper methods such as `getPost()`, `createPost()`, `updatePost()`, `patchPost()`, and `deletePost()`.

## Axe Accessibility Helper

`utils/accessibilityHelper.ts` runs Axe scans, filters results to critical and serious impacts by default, and formats violations so failures are readable in the console and attached Playwright reports.

## GitHub Actions

`.github/workflows/playwright.yml` runs separate CI jobs for:

- API tests
- UI tests
- Accessibility tests

Each job checks out the code, installs dependencies, runs the correct npm script, and uploads the Playwright HTML report.

## How To Run

```bash
npm test
npm run test:ui
npm run test:api
npm run test:a11y
npm run test:headed
npm run test:debug
```

## Interview Explanation

This framework separates UI, API, and accessibility tests. UI tests use Page Object Model to centralize selectors and actions. Fixtures inject reusable objects like LoginPage, reducing duplication. API tests use Playwright request and helper methods to validate REST operations. Accessibility tests use Axe to scan rendered pages for critical and serious WCAG-related violations. GitHub Actions runs the suites in CI and uploads reports.
