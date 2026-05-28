import { expect, test } from '../../fixtures/baseFixture';

// Este archivo contiene ejemplos útiles para una prueba técnica de API.
// Cada test demuestra una operación REST diferente y su propósito.

test.describe('API Technical Examples', () => {
  test('Login flow and use Authorization token', async ({ request }) => {
    // Simula un login y utiliza el token devuelto para acceder a un endpoint protegido.
    const loginResponse = await request.post('https://httpbin.org/post', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: 'candidate',
        password: 'secret-123',
      },
    });

    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    const token = `token-${loginBody.json?.username ?? 'candidate'}`;

    const protectedResponse = await request.get('https://httpbin.org/bearer', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(protectedResponse.ok()).toBeTruthy();
    expect(protectedResponse.status()).toBe(200);

    const protectedBody = await protectedResponse.json();
    expect(protectedBody).toMatchObject({
      authenticated: true,
      token,
    });
  });

  test('Create resource with POST (create / insert)', async ({ apiHelper }) => {
    // POST crea un recurso nuevo en el servidor.
    const payload = {
      title: 'Nuevo post desde Playwright',
      body: 'Este es un body de ejemplo para POST',
      userId: 99,
    };

    const response = await apiHelper.createPost(payload);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(body.id).toBeTruthy();
  });

  test('Replace resource with PUT (full update)', async ({ apiHelper }) => {
    // PUT reemplaza todo el recurso existente con una nueva representación.
    const updatePayload = {
      id: 1,
      title: 'Reemplazo completo con PUT',
      body: 'Todo el objeto se actualiza en esta llamada.',
      userId: 1,
    };

    const response = await apiHelper.updatePost(1, updatePayload);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(updatePayload);
  });

  test('Update resource with PATCH (partial update)', async ({ apiHelper }) => {
    // PATCH actualiza solo algunos campos del recurso, no todo el objeto.
    const patchPayload = {
      title: 'Actualización parcial con PATCH',
    };

    const response = await apiHelper.patchPost(1, patchPayload);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(patchPayload);
  });

  test('Delete resource with DELETE (remove object)', async ({ apiHelper }) => {
    // DELETE elimina el recurso indicado.
    const response = await apiHelper.deletePost(1);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual({});
  });

  test('Validate response schema for an object', async ({ apiHelper }) => {
    // GET lee un recurso y valida que la respuesta cumple el contrato esperado.
    const response = await apiHelper.getPost(1);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      }),
    );
  });

  test('Handle 404 Not Found gracefully', async ({ apiHelper }) => {
    // Prueba que el sistema maneja un recurso inexistente con un 404.
    const response = await apiHelper.getPost(99999999);
    expect(response.status()).toBe(404);
  });

  test('Handle explicit 400 Bad Request response', async ({ request }) => {
    // Simula un error 400 para validar el manejo de respuestas de error.
    const response = await request.get('https://httpbin.org/status/400');
    expect(response.status()).toBe(400);
  });

  test('POST request with auth, custom headers and payload', async ({ request }) => {
    // Ejemplo de llamada con Authorization y headers personalizados.
    const token = 'example-token-12345';
    const payload = {
      name: 'Technical Test',
      description: 'Send payload with auth and custom headers',
      active: true,
    };

    const response = await request.post('https://httpbin.org/post', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Custom-Header': 'Playwright-API-Test',
      },
      data: payload,
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.json).toEqual(payload);
    expect(body.headers).toMatchObject({
      Authorization: `Bearer ${token}`,
      'X-Custom-Header': 'Playwright-API-Test',
    });
  });

  test('Use beforeEach for shared auth setup', async ({ request }) => {
    // Flujo de autenticación compartido: primero login, luego acceso autorizado.
    const loginResponse = await request.post('https://httpbin.org/post', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: 'candidate-2',
        password: 'pass-456',
      },
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginBody = await loginResponse.json();
    const authToken = `token-${loginBody.json?.username ?? 'candidate-2'}`;

    const response = await request.get('https://httpbin.org/bearer', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.authenticated).toBe(true);
    expect(body.token).toBe(authToken);
  });
});
