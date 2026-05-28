# K6 Performance Testing

This folder contains small K6 examples for interview preparation. It is not a production performance framework.

## What K6 Is

K6 is a performance testing tool commonly used to test APIs and backend services. Tests are written in JavaScript and can simulate multiple virtual users calling an endpoint.

## When To Use K6

Use K6 when you want to understand how an API behaves under traffic. It is useful for validating response time, error rate, throughput, and stability under expected or increased load.

## Test Types

- Smoke test: a very small test to confirm the script and endpoint work.
- Load test: tests expected normal or peak traffic.
- Stress test: pushes beyond expected traffic to find breaking points.
- Spike test: sends a sudden traffic increase to see how the system reacts.

## Key Concepts

- VUs: virtual users. They simulate users running the test script.
- Checks: functional validations during the run, such as status code 200.
- Thresholds: pass/fail performance goals, such as error rate below 1 percent.
- p95: the 95th percentile response time. If p95 is 800 ms, 95 percent of requests completed in 800 ms or less.

## Why Heavy Load Tests Should Not Run On Every PR

Heavy load tests can be slow, expensive, noisy, and may affect shared environments. In CI, it is better to run lightweight smoke performance checks on critical endpoints. Larger load, stress, or spike tests should usually run on a schedule, in a dedicated environment, or before releases.

## How This Complements Playwright Tests

Playwright UI tests validate browser workflows. Playwright API tests validate API behavior and contracts. K6 complements both by validating performance characteristics such as response time and error rate under load.

## Scripts

Install K6 before running these scripts. On macOS, one common option is:

```bash
brew install k6
```

Run the smoke performance test:

```bash
npm run test:perf:smoke
```

Run the small load test:

```bash
npm run test:perf:load
```

## Interview Explanation

I would use K6 for API performance validation. I would start with lightweight smoke performance tests for critical endpoints using checks and thresholds, then add load or stress scenarios based on risk. I would monitor p95 response time and error rate. I would not run heavy performance tests on every PR; I would run lightweight checks in CI and heavier tests on schedule or before releases.
