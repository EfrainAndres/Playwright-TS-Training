import { test } from '../../fixtures/baseFixture';
import { readData } from '../../utils/dataReader';

type LoginTestData = {
    username: string;
    password: string;
    expected: 'success' | 'error';
    run: string;
};

const testData = readData('./test-data/loginDataNew.json') as LoginTestData[];

test.describe('Data-driven login tests', () => {
    for (const data of testData) {
        test(`login result for ${data.username}`, async ({ loginPage }) => {
            test.skip(data.run.trim().toLowerCase() !== 'yes', 'Run flag is not yes');

            await test.step('Open login page', async () => {
                await loginPage.goToLoginPage();
            });

            await test.step('Submit credentials', async () => {
                await loginPage.login(data.username, data.password);
            });

            await test.step('Validate expected result', async () => {
                if (data.expected === 'success') {
                    await loginPage.expectLoginSuccess();
                } else {
                    await loginPage.expectLoginError(
                        'Epic sadface: Sorry, this user has been locked out.'
                    );
                }
            });
        });
    }
});
