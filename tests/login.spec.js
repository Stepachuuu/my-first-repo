import { test, expect } from '@playwright/test';

//Первый тест

test.describe('Первое задание', () => {
    test('Успешный вход в систему', async ({page}) => {
        //1. Переход на страницу сайта
        await page.goto('https://www.saucedemo.com/');
        //2. Ввод логина
        //Используем селектор по placeholder
        await page.locator('[placeholder="Username"]').fill('standard_user');
        //3. Вводим пароль
        //Используем селектор по id
        await page.locator('#password').fill('secret_sauce');
        //4. Нажимаем кнопку входа
        // Используем селектор по data-test атрибуту
        await page.locator('[data-test="login-button"]').click();

        //5. Assertion, что url содержит inventory.html
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
});