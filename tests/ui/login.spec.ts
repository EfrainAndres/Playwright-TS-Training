import { expect, test } from '../../fixtures/baseFixture';
import loginData from '../../test-data/loginData.json';

test('valid user can log in', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(
        loginData.valid_user.username,
        loginData.valid_user.password
    );
    await loginPage.expectLoginSuccess();
});

test('invalid user sees an error message', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(
        loginData.invalid_user.username,
        loginData.invalid_user.password
    );
    await loginPage.expectLoginError();
});
