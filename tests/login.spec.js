import { test, expect } from "@playwright/test";
import { execPath } from "node:process";

//Первый тест

test.describe("Первое задание", () => {
  test("Успешный вход в систему", async ({ page }) => {
    //1. Переход на страницу сайта
    await page.goto("https://www.saucedemo.com/");
    //2. Ввод логина
    //Используем селектор по placeholder
    await page.locator('[placeholder="Username"]').fill("standard_user");
    //3. Вводим пароль
    //Используем селектор по id
    await page.locator("#password").fill("secret_sauce");
    //4. Нажимаем кнопку входа
    // Используем селектор по data-test атрибуту
    await page.locator('[data-test="login-button"]').click();

    //5. Assertion, что url содержит inventory.html
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});

// Второй тест (доп.задание)
test.describe("Дополнительное задание", () => {
  test("Неуспешный вход", async ({ page }) => {
    //1. Переход на страницу сайта
    await page.goto("https://www.saucedemo.com/");
    //2. Ввод логина и пароля
    //Используем селектор по placeholder (логин) и селектор по id (пароль)
    await page.locator('[placeholder="Username"]').fill("locked_out_user");
    await page.locator("#password").fill("secret_sauce");
    //4. Нажимаем кнопку входа
    // Используем селектор по data-test атрибуту
    await page.locator('[data-test="login-button"]').click();

    //5. Assertion, что появилось сообщение об ошибке
    const error = page.locator(".error-message-container"); //присваиваем ошибке локатор по СSS-классу
    await expect(error).toBeVisible(); // проверяем стало ли видно ошибку на странице
    await expect(error).toContainText("Epic sadface: Sorry"); // проверяем совпадает ли текст (не точное совпадение)
    //Проверка на точное совпадение текста
    await expect(error).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
