import { test } from '../../fixtures/baseFixture';

test('fixture provides a ready-to-use LoginPage object', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoginSuccess();
});
