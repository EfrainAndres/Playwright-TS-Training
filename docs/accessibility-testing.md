# Accessibility Testing With Axe

Accessibility testing checks whether an application can be used by people with different abilities, devices, and assistive technologies. In automated tests, it helps catch common issues early before they reach users.

## What Axe Is

Axe is an accessibility testing engine. The `@axe-core/playwright` package lets Playwright open a page, inject Axe into the browser, scan the rendered HTML, and return accessibility violations.

## How It Works In This Framework

The accessibility tests live in:

```text
tests/accessibility/
```

The reusable helper lives in:

```text
utils/accessibilityHelper.ts
```

Each test follows this flow:

1. Navigate to an important page.
2. Run an Axe scan with `checkAccessibility(page)`.
3. Filter results to `critical` and `serious` violations.
4. Attach a readable report when violations are found.
5. Assert that no critical or serious violations exist.

Filtering to critical and serious issues keeps the tests useful for CI and avoids noisy failures from lower-impact findings while learning the framework.

## How To Run

Run only accessibility tests:

```bash
npm run test:a11y
```

Run all Playwright tests:

```bash
npm test
```

## Critical And Serious Violations

Critical violations are issues that can block users from accessing or completing key actions.

Serious violations are important accessibility problems that can significantly affect users and should be fixed.

Examples Axe can detect include:

- Missing form labels
- Color contrast issues
- Invalid ARIA attributes
- Incorrect ARIA roles
- Missing alternative text
- Broken heading or landmark structure

## Manual Validation Still Needed

Automated accessibility tests are valuable, but they do not replace manual checks. A complete accessibility review should also validate:

- Keyboard navigation
- Focus order
- Screen reader behavior
- Semantic HTML
- Labels
- Contrast
- ARIA usage

## Interview Explanation

In this framework, I added Axe with Playwright to scan key pages for accessibility issues. The tests run automated checks and focus on critical and serious violations to avoid noisy failures. I would combine this with manual accessibility validation, including keyboard navigation, focus order, labels, contrast, ARIA attributes, semantic HTML, and screen reader behavior.
