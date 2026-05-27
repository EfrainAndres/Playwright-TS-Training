import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('Simple Get Request', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/comments');
  const responseObject = await response.json();
  console.log(responseObject);
  expect(responseObject[0]).toHaveProperty('email');
  expect(responseObject).toHaveLength(500); // Adjust the length as needed
});

test('Simple Post Request', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/comments', {
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  });
  const responseObject = await response.json();
  console.log(responseObject);
  expect(responseObject).toHaveProperty('name');
  expect(responseObject).toHaveProperty('email');
});

test('Request with Authorization header example', async ({ request }) => {
  const token = 'example-token-12345';
  const response = await request.get('https://httpbin.org/bearer', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toMatchObject({
    authenticated: true,
    token,
  });
});

test('POST request with Authorization and JSON payload', async ({ request }) => {
  const token = 'example-token-12345';
  const payload = {
    title: 'Nuevo recurso',
    description: 'Ejemplo de envío de data con auth',
    userId: 42,
  };

  const response = await request.post('https://httpbin.org/post', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: payload,
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.json).toEqual(payload);
  expect(body.headers).toHaveProperty('Authorization', `Bearer ${token}`);
});