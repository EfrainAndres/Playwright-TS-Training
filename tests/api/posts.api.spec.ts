import { expect, test } from '../../fixtures/baseFixture';

test.describe('Posts API', () => {
  test('GET /posts/1 should return a valid post', async ({ apiHelper }) => {
    const response = await apiHelper.getPost(1);
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

  test('POST /posts should create a new post', async ({ apiHelper }) => {
    const payload = {
      title: 'Playwright API test',
      body: 'API helper keeps request setup out of the test body',
      userId: 123,
    };

    const response = await apiHelper.createPost(payload);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(body.id).toBeTruthy();
  });
});
