import { test, expect } from '@playwright/test';

test.describe('Playwright API scratch', () => {
  test('GET /posts/1 should return a valid post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      userId: 1,
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('POST /posts should create a new post', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Playwright API test',
        body: 'Este es un ejemplo de prueba API',
        userId: 123,
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject({
      title: 'Playwright API test',
      body: 'Este es un ejemplo de prueba API',
      userId: 123,
    });
    expect(body.id).toBeTruthy();
  });
});
