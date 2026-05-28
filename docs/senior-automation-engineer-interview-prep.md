# Senior Automation Engineer Interview Prep

## Quick Positioning Statement

### Tell me about yourself and your automation experience.

I am an SDET with strong hands-on experience in test automation, especially with WebdriverIO, Appium, mobile testing, API validation, regression testing, defect analysis, and troubleshooting. I have worked closely with developers and CI/CD processes to improve test coverage, investigate failures, and provide clear evidence for defects.

My strongest real experience has been with WebdriverIO and Appium, but the automation concepts transfer well to Playwright: reliable locators, reusable page objects, test data management, API setup, reporting, and debugging. To prepare for this role, I recently built a Playwright TypeScript framework with UI tests, API tests, accessibility checks with Axe, typed fixtures, Page Object Model, data-driven testing, and GitHub Actions. I am comfortable ramping up quickly because I already understand the testing principles and can apply them in newer tools.

## Role Alignment Summary

| Role requirement | How to position my experience |
| --- | --- |
| Playwright TypeScript | My strongest hands-on background is WebdriverIO and Appium, but I recently prepared a Playwright TypeScript framework and understand locators, fixtures, API testing, projects, traces, and CI execution. |
| Framework architecture | I can explain how to separate UI, API, accessibility, page objects, fixtures, helpers, test data, docs, and CI so the framework is easy to maintain. |
| GitHub Actions | I have CI/CD collaboration experience and recently configured GitHub Actions jobs for UI, API, and accessibility suites. |
| API testing | I have practical experience validating status codes, payloads, headers, authentication, negative scenarios, and using APIs to support test setup. |
| Accessibility testing | I am ramping up with Axe and WCAG. I understand that automated checks help catch issues but do not replace manual keyboard and screen reader validation. |
| K6 | I have basic to intermediate preparation with K6 concepts such as virtual users, checks, thresholds, p95, smoke, load, stress, and spike tests. |
| CI/CD | I can discuss npm scripts, browser installation, artifacts, reports, environment variables, secrets, and CI-only failures. |
| Test data | I have used data-driven testing and understand how to manage JSON, CSV, Excel, API-created data, and environment-specific data. |
| Flaky tests | I troubleshoot using evidence: traces, logs, screenshots, videos, network data, console errors, timing, selectors, and environment differences. |
| Code reviews | I review automation for readability, reliability, selectors, assertions, test independence, maintainability, and useful failure messages. |
| AI-assisted testing | I can use AI to generate test ideas, summarize failures, draft cases, and analyze patterns, but I always validate output and protect sensitive data. |
| Senior ownership | I focus on risk, communication, maintainability, mentoring, collaboration, and making quality visible across the SDLC. |

## A. Playwright + TypeScript

### What is your experience with Playwright?

My strongest hands-on automation experience has been with WebdriverIO and Appium, especially for mobile and regression testing. Recently, I prepared a Playwright TypeScript framework that includes UI tests, API tests, Axe accessibility checks, Page Object Model, typed fixtures, data-driven tests, and GitHub Actions.

I would position myself as someone who understands automation architecture and is actively applying those concepts in Playwright. The main Playwright areas I have practiced are locators, auto-waiting, web-first assertions, projects, browser contexts, traces, screenshots, videos, and API request testing.

### How would you explain the difference between Playwright and WebdriverIO?

WebdriverIO is built around the WebDriver ecosystem and is very flexible across web and mobile, especially when paired with Appium. Playwright is more focused on modern browser automation and has strong built-in features like auto-waiting, browser contexts, tracing, network control, and web-first assertions.

My background in WebdriverIO helps because the core automation principles are the same: stable selectors, clear assertions, good test data, reusable objects, and reliable CI execution. Playwright gives some of those capabilities out of the box, which can reduce custom framework code.

### Why use TypeScript for automation?

TypeScript helps make test code safer and easier to maintain. Types catch mistakes earlier, improve autocomplete, document expected data shapes, and make shared helpers easier to use across a team.

For example, in this framework the API helper can define `Post` and `CreatePostPayload` types, and fixtures can define a typed `loginPage` or `apiHelper`. That makes tests more readable and reduces guesswork.

### What Playwright locators do you prefer?

I prefer user-facing and stable locators:

- `getByRole()` for accessible roles like buttons, links, and headings.
- `getByLabel()` for form fields.
- `getByText()` when visible text is the real user contract.
- `getByTestId()` or `data-test` selectors when the app provides stable testing hooks.

For SauceDemo, I use data-test selectors because the app exposes them and they are stable. In a real project, I would align with developers on consistent test IDs for critical workflows.

### What are web-first assertions?

Web-first assertions are Playwright assertions that automatically wait for the expected condition. For example, `await expect(locator).toBeVisible()` waits until the locator is visible or times out.

This is better than fixed sleeps because the test waits for a real condition. It improves reliability and reduces flaky timing failures.

### How do you debug Playwright failures?

I start with the evidence:

- Trace Viewer to replay the test.
- Screenshot or video to see the UI state.
- Error message and assertion details.
- Network calls if the UI depends on APIs.
- Console errors from the browser.
- CI artifacts to compare local vs CI behavior.

Then I ask whether the failure is a product bug, test data issue, locator issue, timing issue, environment issue, or a real regression.

### What is Trace Viewer used for?

Trace Viewer is used to inspect a failed Playwright test step by step. It shows actions, locators, screenshots, DOM snapshots, network activity, and console logs.

It is very useful for CI failures because I can see what happened without rerunning the test manually.

### How do you avoid flaky waits?

I avoid fixed waits like `waitForTimeout()` unless I am debugging. In real tests, I wait for meaningful conditions:

- Element is visible.
- URL changed.
- API response completed.
- Loading indicator disappeared.
- Specific text or state is present.

Playwright auto-waiting and web-first assertions handle many timing cases if locators and assertions are written well.

### How would you organize Playwright tests?

I would separate tests by responsibility:

- `tests/ui` for browser UI behavior.
- `tests/api` for REST API validation.
- `tests/accessibility` for Axe accessibility scans.
- `pages` for page objects.
- `fixtures` for reusable typed setup.
- `utils` for helpers.
- `test-data` for data-driven inputs.
- `docs` for framework explanation.

That structure is easy to explain, easy to scale, and avoids mixing concerns.

## B. Framework Architecture

### How would you design an automation framework from scratch?

I would start simple and build only what the team needs:

- Define the test types: UI, API, accessibility, maybe performance.
- Pick clear folder boundaries.
- Use Page Object Model for repeated UI flows.
- Add fixtures for reusable setup like pages, API clients, and auth.
- Add helpers for API, accessibility, data readers, and reporting.
- Keep test data external and environment-aware.
- Add CI scripts and artifacts early.
- Document how to run and how to add tests.

The goal is not to create a large framework. The goal is fast feedback, maintainability, and clear ownership.

### Why separate UI, API, and accessibility tests?

They validate different risks and run differently:

- UI tests validate user workflows in the browser.
- API tests validate service behavior faster and with less UI flakiness.
- Accessibility tests scan rendered pages for WCAG-related issues.

Separating them makes CI easier to manage. For example, API tests can run quickly without browsers, while UI and accessibility tests need browser installation and artifacts.

### Why use Page Object Model?

Page Object Model centralizes selectors and common actions. Instead of every test knowing how to log in, tests call `loginPage.login(username, password)`.

This improves readability and makes maintenance easier when the UI changes. If a selector changes, I update the page object instead of many tests.

### What should go inside a Page Object?

A Page Object should include:

- Locators for that page or component.
- User actions like `login()`.
- Page-specific assertions like `expectLoginSuccess()`.
- Small helper methods that describe user behavior.

It should make tests read like business workflows, not like low-level DOM scripts.

### What should not go inside a Page Object?

I would avoid putting too much test logic inside page objects:

- No large conditional test flows.
- No test data decisions.
- No unrelated API logic.
- No assertions that belong to the specific test scenario unless they are reusable page-level assertions.

The test should still clearly show the scenario being validated.

### What are fixtures in Playwright?

Fixtures are reusable setup objects provided to tests. In Playwright, you can extend the base `test` and inject typed objects.

In this framework, `fixtures/baseFixture.ts` provides:

- `loginPage`
- `apiHelper`
- `accessibilityScanner`

This lets tests request what they need without repeating setup code.

### Why are fixtures better than repeating setup in each test?

Fixtures reduce duplication and make setup consistent. If every test creates its own page object or API helper, changes become repetitive.

With fixtures, the setup is typed, reusable, and easier to evolve. It also makes tests cleaner because the test focuses on behavior.

### How do you manage test data?

I prefer test data that is:

- Clear and readable.
- Separate from test logic.
- Environment-aware.
- Easy to reset or create through APIs.
- Not dependent on shared mutable state when possible.

For small study examples, JSON, CSV, or Excel are fine. In a real project, I would often use API setup, seeded data, factories, or controlled test accounts.

### How would you scale a framework for a larger team?

I would focus on consistency:

- Shared coding standards.
- Clear folder conventions.
- Reusable fixtures and helpers.
- Test tags for smoke, regression, accessibility, and API.
- CI jobs with reports and artifacts.
- Ownership rules for flaky tests.
- Documentation and examples for new contributors.

I would avoid adding abstractions unless they remove real duplication or solve a team problem.

### How would you review automation code?

I review for:

- Stable locators.
- Clear test purpose.
- Good assertions.
- No unnecessary waits.
- Independent tests.
- Good test data handling.
- Reusable setup through fixtures/helpers.
- Useful failure messages.
- No over-engineering.

For senior-level review, I also ask whether the test adds meaningful coverage or just adds maintenance cost.

## C. API Testing

### How do you test REST APIs?

I validate the request and response behavior:

- HTTP status code.
- Response body fields and values.
- Headers.
- Authentication and authorization.
- Error handling.
- Negative scenarios.
- Data creation, update, and deletion flows.

I usually cover GET, POST, PUT, PATCH, and DELETE depending on the API.

### How does Playwright support API testing?

Playwright provides the `request` fixture through `APIRequestContext`. That allows tests to call APIs directly without opening a browser.

In my practice framework, I added an `apiHelper` fixture and `utils/apiHelper.ts` so tests can call methods like `getPost()`, `createPost()`, `updatePost()`, and `deletePost()`.

### What would you validate in an API response?

I would validate:

- Status code, such as 200, 201, 400, 401, 403, or 404.
- Required fields in the body.
- Data types and expected values.
- Headers like content type or caching headers.
- Error messages for negative cases.
- Response time if performance is relevant.

The level of validation depends on whether it is a smoke test, regression test, or contract-level test.

### How do API tests complement UI tests?

API tests provide faster feedback and isolate backend behavior. UI tests validate the user experience, but they are slower and can fail because of browser, timing, or visual changes.

API tests can catch service regressions earlier and reduce how much setup the UI tests need to do through the browser.

### How do you use APIs for UI test setup?

Instead of creating all data through the UI, I can use APIs to:

- Create users.
- Create orders or records.
- Reset test data.
- Authenticate and set state.
- Clean up after tests.

This makes UI tests shorter, faster, and less flaky because they focus on the UI behavior being tested.

### How do you handle authentication in API testing?

I would usually create an auth helper that logs in or requests a token, then reuses that token in headers.

For example:

```ts
const token = await authHelper.getToken();
const response = await request.get('/users/me', {
  headers: { Authorization: `Bearer ${token}` },
});
```

In a real project, I would store secrets in CI secrets or environment variables, not in the repository.

### What is schema validation?

Schema validation checks whether the response has the expected shape and data types. For example, a post should have `id` as a number, `title` as a string, and `body` as a string.

Tools like JSON Schema, AJV, or Zod can help validate schemas. I understand the concept and would use a tool like that when the project needs stronger contract checks.

### What is contract testing?

Contract testing verifies the agreement between a consumer and a provider. It checks that an API provider continues to return what consumers expect.

Pact is a common tool for this. I would not overclaim deep Pact experience, but I understand the purpose: reduce integration surprises between services.

### Difference between schema validation and contract testing?

Schema validation checks the shape of one response. Contract testing checks the agreement between services and can be part of the provider/consumer development workflow.

Simple explanation: schema validation asks, "Does this response look right?" Contract testing asks, "Are the provider and consumer still compatible?"

### How do you test negative API scenarios?

I test invalid or unauthorized behavior:

- Missing required fields.
- Invalid data types.
- Invalid IDs.
- Unauthorized requests.
- Forbidden access.
- Duplicate data.
- Unsupported methods.

For each case, I validate the expected status code and useful error response.

## D. Accessibility Testing

### What is accessibility testing?

Accessibility testing checks whether an application can be used by people with different abilities and assistive technologies. It includes keyboard navigation, screen reader support, semantic HTML, labels, contrast, focus order, and WCAG compliance.

### What is Axe?

Axe is an accessibility testing engine. With `@axe-core/playwright`, Playwright opens the page, Axe scans the rendered DOM, and the test receives violations.

I recently implemented Axe checks in a Playwright framework and filtered results to critical and serious violations to keep CI useful.

### How did you implement Axe with Playwright?

I added an accessibility helper that:

- Creates an Axe builder for the current page.
- Allows WCAG tags like `wcag2a` and `wcag2aa`.
- Filters violations to critical and serious impact by default.
- Formats readable violation details.
- Attaches the report to Playwright test output.

Then accessibility tests use an `accessibilityScanner` fixture to keep tests clean.

### What types of issues can Axe detect?

Axe can detect many common issues:

- Missing labels.
- Buttons or links without accessible names.
- Color contrast issues.
- Invalid ARIA attributes.
- Incorrect roles.
- Missing alternative text.
- Broken heading or landmark structure.

### What are critical and serious violations?

Critical violations are issues that may block users from accessing important content or completing a task. Serious violations have significant impact and should be prioritized.

In CI, focusing on critical and serious issues helps avoid noise while still catching important problems.

### Would you fail the pipeline for all accessibility issues?

Not always. I would start by failing the pipeline for critical and serious violations on key pages. For moderate or minor issues, I might report them first and create a plan with the team.

The decision depends on the product, compliance requirements, release risk, and team maturity.

### What does Axe not cover?

Axe does not fully replace manual accessibility testing. It cannot fully validate:

- Keyboard usability.
- Logical focus order.
- Screen reader experience.
- Whether alternative text is meaningful.
- Whether the user journey makes sense.
- Cognitive accessibility.

Nota en espanol: Axe encuentra muchos problemas tecnicos, pero una persona todavia debe validar la experiencia real.

### What manual checks are still needed?

I would manually check:

- Tab navigation.
- Focus visibility.
- Focus order.
- Screen reader labels.
- Modal behavior.
- Form error announcements.
- Meaningful alt text.
- Zoom and responsive behavior.

### How would you prioritize accessibility testing in an EdTech platform?

I would prioritize the workflows students and teachers depend on most:

- Login and account recovery.
- Dashboard.
- Course content pages.
- Assignments.
- Quizzes and exams.
- Forms.
- Video or media controls.
- Grades and feedback.

In EdTech, accessibility is not optional because students may rely on assistive technologies to complete required learning activities.

### What WCAG concepts should a QE know?

A QE should understand the POUR principles:

- Perceivable.
- Operable.
- Understandable.
- Robust.

They should also understand labels, contrast, keyboard access, focus order, semantic HTML, ARIA usage, and accessible names.

## E. GitHub Actions / CI/CD

### How would you run Playwright tests in GitHub Actions?

I would create workflow jobs that:

- Check out the code.
- Set up Node.
- Run `npm ci`.
- Install Playwright browsers when needed.
- Run the correct npm script.
- Upload reports and artifacts.

For this framework, the scripts are `npm run test:ui`, `npm run test:api`, and `npm run test:a11y`.

### How would you structure CI jobs?

I would split jobs by suite:

- API tests for fast backend feedback.
- UI tests for browser workflows.
- Accessibility tests for Axe scans.

This makes failures easier to understand and lets the team tune each job separately.

### What are matrix builds?

A matrix build runs the same job with different inputs, such as browser, operating system, Node version, or shard number.

Example: run UI tests on Chromium and Firefox, or split tests into multiple shards.

### What is sharding?

Sharding splits a test suite into parts so multiple machines can run different portions at the same time.

Example:

```bash
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

### Difference between parallelism and sharding?

Parallelism usually means running tests at the same time within one machine or worker pool. Sharding means splitting the suite across multiple machines or CI jobs.

Parallelism speeds up execution locally or inside one job. Sharding helps when the suite is large and one machine is not enough.

### What artifacts would you upload?

I would upload:

- HTML report.
- Trace files.
- Screenshots.
- Videos if enabled.
- Test results.
- Accessibility violation attachments.

These artifacts help debug CI failures without reproducing them immediately.

### How would you run smoke vs regression?

I would tag or group tests:

- Smoke: critical workflows, runs on every PR.
- Regression: broader coverage, runs nightly or before release.
- API smoke: fast backend checks on every PR.
- Accessibility smoke: key pages for critical and serious Axe issues.

The goal is fast PR feedback plus deeper scheduled coverage.

### How would you handle environment variables and secrets?

I would use GitHub Actions secrets or environment variables for values like usernames, passwords, tokens, and URLs.

Secrets should not be hardcoded in tests or committed to the repository.

### What would you do if tests pass locally but fail in CI?

I would compare:

- Browser version.
- Node version.
- OS differences.
- Environment variables.
- Test data.
- Network access.
- Timeouts.
- Headless vs headed behavior.
- CI artifacts like traces and screenshots.

Then I would reproduce using the same CI command locally if possible.

## F. Flaky Tests and Debugging

### How do you investigate a flaky test?

I first collect evidence from multiple failures:

- Trace Viewer.
- Screenshots and videos.
- Network logs.
- Console errors.
- Timing pattern.
- CI vs local behavior.
- Recent app or test changes.

Then I isolate whether the issue is product behavior, environment instability, data collision, timing, or test design.

### What are common causes of flakiness?

Common causes include:

- Unstable locators.
- Fixed waits.
- Shared test data.
- Tests depending on order.
- Slow environments.
- Network delays.
- Animations or loading states.
- Feature flags.
- Third-party services.

### How do you reduce flakiness?

I reduce flakiness by:

- Using stable locators.
- Using web-first assertions.
- Waiting for real conditions.
- Keeping tests independent.
- Creating or resetting data through APIs.
- Avoiding shared state.
- Making assertions specific but not brittle.
- Running reliable cleanup.

### When are retries acceptable?

Retries are acceptable as temporary noise reduction, especially in CI, but they should not replace root cause analysis.

If a test needs retries often, I would track it, investigate it, and either fix the test or raise a product/environment issue.

### How do you distinguish product bug vs test issue?

I look at evidence:

- Does the app behave incorrectly for a real user?
- Is the assertion aligned with the requirement?
- Is the locator wrong or stale?
- Does the failure reproduce manually?
- Does the API return unexpected data?
- Did the test create the correct preconditions?

If the user-facing behavior is wrong, I treat it as a product bug. If the test expectation or setup is wrong, I fix the test.

### What evidence do you include in a bug report?

I include:

- Clear title and impact.
- Steps to reproduce.
- Expected vs actual result.
- Environment.
- Test data used.
- Screenshots or video.
- Trace or logs.
- Network response if relevant.
- Severity and business risk.

## G. K6 / Performance Testing

### What is K6?

K6 is a performance testing tool often used for API load testing. It lets teams write JavaScript-based scripts to simulate users, check responses, and define performance thresholds.

My K6 knowledge is basic to intermediate right now, but I understand how it fits into a QA strategy.

### What is a virtual user?

A virtual user, or VU, simulates a user executing the test script. If I run 20 VUs, K6 simulates 20 users performing the defined actions.

### What are checks and thresholds?

Checks validate expected behavior during the test, such as status code 200.

Thresholds define pass/fail performance goals, such as p95 response time under 500 ms or error rate below 1 percent.

### What is p95 response time?

p95 means 95 percent of requests were faster than that time, and 5 percent were slower.

It is more useful than only looking at average response time because averages can hide slow user experiences.

### Difference between smoke, load, stress, and spike testing?

- Smoke performance test: small test to confirm the script and endpoint work.
- Load test: expected normal or peak traffic.
- Stress test: push beyond expected load to find breaking points.
- Spike test: sudden traffic increase to see how the system reacts.

### How would you add K6 to a QA strategy?

I would start with a small baseline:

- Identify critical APIs.
- Create smoke performance scripts.
- Add checks and thresholds.
- Track p95, p99, error rate, and throughput.
- Run heavier tests on a schedule or before releases.

I would work with developers or DevOps to choose realistic load profiles.

### Would you run K6 tests in every PR?

I would not run heavy load tests in every PR. I might run a lightweight smoke performance test, but heavier load, stress, or spike tests should run on a schedule, pre-release, or in a dedicated performance environment.

## H. Test Strategy and Senior-Level Thinking

### How do you decide what to automate?

I use risk-based thinking:

- Critical user journeys.
- High business impact.
- Repetitive regression areas.
- Stable functionality.
- Areas with frequent bugs.
- Scenarios that benefit from fast feedback.

I also consider maintainability. Not every test is worth automating.

### What should not be automated?

I would avoid automating:

- One-time scenarios.
- Highly unstable features.
- Tests with unclear expected results.
- Visual or UX judgments that need human review.
- Low-value cases that create high maintenance.

Manual exploration is still important, especially early in feature development.

### How do you design a regression strategy?

I would define layers:

- Unit and component tests owned mostly by developers.
- API tests for service behavior.
- UI smoke tests for critical journeys.
- Broader UI regression for high-risk flows.
- Accessibility checks for key pages.
- Performance checks for critical APIs.

Then I would decide what runs per PR, nightly, and pre-release.

### How do you balance manual and automated testing?

Automation is best for repeatable checks and regression confidence. Manual testing is best for exploration, UX, edge cases, new features, and areas where human judgment matters.

As a senior QE, I would use both. The goal is quality, not automation for its own sake.

### How do you test a new feature from requirements?

I start by understanding:

- Acceptance criteria.
- User workflow.
- Risks and edge cases.
- Data needs.
- API dependencies.
- Accessibility concerns.
- Observability and logs.

Then I design manual exploratory coverage first, identify what should be automated, and collaborate with developers on testability.

### How do you work with PMs and developers?

With PMs, I clarify user impact, acceptance criteria, priorities, and release risk. With developers, I discuss testability, data setup, logs, API behavior, edge cases, and defects.

I try to join early so quality is built into the feature, not checked only at the end.

### How do you communicate risk?

I communicate risk in business terms:

- What can fail.
- Who is affected.
- How likely it is.
- How severe it is.
- What evidence we have.
- What options exist.

For example: "The login flow is stable, but assignment submission has two unresolved defects affecting students using keyboard navigation."

### How do you ensure quality throughout the SDLC?

I get involved early in requirements, review acceptance criteria, suggest testability improvements, support developers with API or unit-level checks, automate important regression flows, monitor CI results, and communicate release risk clearly.

### How would you mentor other QEs?

I would mentor through examples, pairing, code reviews, and clear framework documentation. I would explain why a locator, assertion, or fixture pattern is better, not just say what to change.

### How do you handle code reviews?

I keep feedback specific and respectful. I focus on reliability, maintainability, readability, test independence, and whether the test gives useful failure information.

## I. AI-Assisted Testing

### How would you use AI in testing?

I would use AI as an assistant for:

- Generating test ideas.
- Drafting test cases.
- Reviewing requirements for edge cases.
- Summarizing failure logs.
- Suggesting automation snippets.
- Identifying flaky patterns.

I would not blindly trust AI output. I would review, run, and validate everything.

### What are examples of AI-assisted automation?

Examples include:

- Generate initial Playwright test skeletons.
- Create data-driven test scenarios.
- Summarize CI failure logs.
- Suggest missing negative cases.
- Explain a trace or error message.
- Draft bug reports from evidence.

### What are the risks of AI-generated tests?

Risks include:

- Incorrect assertions.
- Brittle selectors.
- Fake or unsupported APIs.
- Over-automation.
- Security or privacy issues if sensitive data is shared.
- Tests that pass but do not validate real risk.

Human review is required.

### How can AI help test coverage?

AI can help brainstorm edge cases from requirements, compare coverage against acceptance criteria, suggest missing negative scenarios, and identify repeated failure patterns.

It is useful for acceleration, but the QE still owns the quality decision.

### How do you validate AI-generated output?

I validate by:

- Reviewing the logic.
- Running the test.
- Checking selectors.
- Confirming assertions match requirements.
- Removing sensitive data.
- Making the test deterministic.
- Ensuring it fits framework patterns.

## J. Behavioral / Seniority Questions

### Tell me about a challenging bug you investigated.

I would answer using my mobile or regression background. A strong structure is:

1. Explain the user impact.
2. Explain why it was hard to reproduce.
3. Describe the evidence collected: logs, screenshots, API response, device/browser details.
4. Explain how I isolated the root cause.
5. Explain the outcome and prevention.

Example answer:

In a mobile regression cycle, I investigated a failure that appeared inconsistent across devices. I collected device details, app version, logs, screenshots, and API responses. I compared passing and failing runs and found the issue was related to a state/data condition rather than the automation itself. I documented clear steps and evidence so the developer could reproduce it quickly. That experience is similar to how I would investigate Playwright failures using traces, screenshots, network logs, and environment details.

### Tell me about a time you improved an automation framework.

I would focus on maintainability and reliability:

I have improved automation by reducing duplicated logic, stabilizing selectors, organizing reusable flows, improving test data handling, and making failures easier to troubleshoot. Recently, for interview preparation, I built a Playwright TypeScript framework that separates UI, API, and accessibility tests, uses Page Object Model, typed fixtures, helper utilities, test data files, and GitHub Actions. That reflects how I think about framework design: simple, readable, and easy for a team to extend.

### Tell me about a time you disagreed with a developer.

I try to keep disagreements evidence-based. If I believe something is a defect, I show the requirement, user impact, reproduction steps, logs, screenshots, and expected vs actual behavior. I also listen to the developer's technical context.

If it is not a release blocker, I communicate the risk clearly and let the team make an informed decision. The goal is not to win the argument. The goal is to protect the user and the release.

### How do you handle pressure during release?

I prioritize by risk. I focus first on critical user journeys, high-impact defects, and areas changed recently. I communicate status clearly, avoid hiding risk, and separate blockers from lower-priority issues.

I also avoid making rushed automation changes without validation. During release pressure, clear evidence and calm communication matter a lot.

### How do you prioritize when everything is urgent?

I ask:

- What affects the most users?
- What blocks revenue, learning, or core workflows?
- What changed recently?
- What is hardest to recover from?
- What has the highest compliance or accessibility risk?

Then I communicate trade-offs instead of pretending everything can be done at once.

### How do you communicate technical issues to non-technical stakeholders?

I translate technical detail into impact:

"The API returns a 500" becomes "Students may not be able to submit assignments."

I include severity, affected users, workaround, current status, and recommendation.

### Why are you interested in this role?

This role matches where I want to grow: senior automation ownership, Playwright with TypeScript, API testing, CI/CD, accessibility, performance awareness, and collaboration with engineering and product teams.

My background in WebdriverIO, Appium, mobile, API validation, regression, and troubleshooting gives me a strong base, and I have been actively ramping up on Playwright, GitHub Actions, Axe, and K6 to contribute quickly.

### What areas are you currently improving?

I am currently improving my hands-on depth with Playwright TypeScript, GitHub Actions matrix/sharding strategies, Axe accessibility testing, and K6 performance testing.

I am honest that my deepest production experience is WebdriverIO/Appium, but I am confident because the testing architecture and debugging skills transfer well.

## Coding Test Preparation

### Task: Write a Playwright login test

Remember: use stable locators, no fixed waits, clear assertion.

```ts
import { test, expect } from '@playwright/test';

test('valid user can log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
});
```

### Task: Create a Page Object

Remember: page objects centralize selectors and actions.

```ts
export class LoginPage {
  constructor(private readonly page: Page) {}

  usernameInput = this.page.locator('[data-test="username"]');
  passwordInput = this.page.locator('[data-test="password"]');
  loginButton = this.page.locator('[data-test="login-button"]');

  async goToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Task: Add a fixture

Remember: fixtures reduce repeated setup and can be typed.

```ts
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
```

### Task: Write an API GET/POST test

Remember: validate status and payload.

```ts
test('GET /posts/1 returns a post', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toMatchObject({
    id: 1,
    userId: 1,
    title: expect.any(String),
    body: expect.any(String),
  });
});
```

```ts
test('POST /posts creates a post', async ({ request }) => {
  const payload = { title: 'Test', body: 'Body', userId: 1 };
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: payload,
  });

  expect(response.status()).toBe(201);
  expect(await response.json()).toMatchObject(payload);
});
```

### Task: Add an Axe scan

Remember: Axe helps with automated checks, but manual validation is still needed.

```ts
import AxeBuilder from '@axe-core/playwright';

test('page has no critical accessibility violations', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  const seriousOrCritical = results.violations.filter((violation) =>
    violation.impact === 'critical' || violation.impact === 'serious'
  );

  expect(seriousOrCritical).toHaveLength(0);
});
```

### Task: Explain a GitHub Actions workflow

Remember the flow:

```yaml
steps:
  - uses: actions/checkout@v5
  - uses: actions/setup-node@v6
    with:
      node-version: lts/*
  - run: npm ci
  - run: npx playwright install --with-deps
  - run: npm run test:ui
```

Say: "The workflow checks out code, installs Node dependencies, installs browser dependencies, runs the suite, and uploads reports for debugging."

### Task: Debug a flaky test

Remember the investigation path:

```text
1. Open trace.zip in Trace Viewer.
2. Check screenshot/video at failure point.
3. Check locator stability.
4. Check network calls and console errors.
5. Check test data and environment differences.
6. Reproduce locally with the same command.
7. Fix root cause, not just add retries.
```

## Questions I Can Ask The Interviewer

- What is the current maturity of the Playwright framework?
- Are tests already running in GitHub Actions?
- How is flakiness tracked and owned?
- How do you split smoke and regression coverage?
- Do you use BrowserStack or a similar device farm?
- What accessibility standards are currently required?
- Is K6 already implemented, or is performance testing still being defined?
- How do QE and developers collaborate on test coverage?
- What test data challenges does the team currently have?
- What would success look like in the first 90 days?

## Last-Minute Study Checklist

- Playwright locators: `getByRole`, `getByLabel`, `getByTestId`, data-test.
- Page Object Model: selectors and reusable page actions.
- Fixtures: typed reusable setup like `loginPage`, `apiHelper`, `accessibilityScanner`.
- API request: status, body, headers, auth, negative scenarios.
- Axe: rendered DOM scan, critical/serious violations, WCAG tags.
- GitHub Actions: `npm ci`, browser install, suite scripts, artifacts.
- Matrix builds: run same workflow with different browsers or shards.
- Sharding: split suite across CI jobs.
- K6 basics: VUs, checks, thresholds, p95, smoke/load/stress/spike.
- Flaky test strategy: trace, logs, screenshots, selectors, data, environment.
- Framework explanation: UI/API/accessibility separation, POM, fixtures, helpers, CI.
- 60-second pitch: WebdriverIO/Appium strength plus Playwright ramp-up.

## Tonight Study Plan

1. Practice the 60-second pitch out loud three times.
2. Review the role alignment table and pick one example for each row.
3. Focus on Playwright locators, fixtures, Trace Viewer, and GitHub Actions.
4. Practice explaining your current framework structure from memory.
5. Review Axe and K6 honestly as ramp-up areas.
6. Prepare two strong stories: one debugging story and one framework improvement story.
