import { test, expect } from "@playwright/test";

const baseUrl = "https://restful-booker.herokuapp.com";

let bookingId;
let token;

test.describe.serial("API-тесты для Restful-booker", () => {
  test("Create booking", async ({ request }) => {
    // 1. Создание бронирования (Create - POST)
    const response = await request.post(`${baseUrl}/booking`, {
      data: {
        firstname: "Alex", // Имя гостя
        lastname: "Malh", // Фамилия гостя
        totalprice: 100, // Стоимость бронирования
        depositpaid: true, // Внесён ли депозит
        bookingdates: {
          // Даты бронирования
          checkin: "2026-01-10",
          checkout: "2026-01-29",
        },
        additionalneeds: "Breakfast", // Дополнительные пожелания
      },
    });

    // Проверки
    expect(response.status()).toBe(200); // 1. Статус-код ответа равен 200 ОК

    const body = await response.json();

    bookingId = body.bookingid; // Сохраняем bookingId для использования в других тестах

    expect(body.bookingid).toBeTruthy(); // 2. В ответе содержится bookingid.

    // 3. В ответе возвращаются те же данные, которые мы отправляли в запросе
    expect(body.booking.firstname).toBe("Alex");
    expect(body.booking.lastname).toBe("Malh");
    expect(body.booking.totalprice).toBe(100);
    expect(body.booking.depositpaid).toBe(true);
    expect(body.booking.additionalneeds).toBe("Breakfast");
  });

  // 2. Получение информации о бронировании (Read - GET)
  test("Get booking", async ({ request }) => {
    const response = await request.get(`${baseUrl}/booking/${bookingId}`); // Отправляем GET запрос для получения бронирования по id

    // Проверки
    expect(response.status()).toBe(200); // 1. Статус-код ответа равен 200 ОК

    const body = await response.json(); // Получаем тело ответа

    // 2. В ответе возвращаются те же данные, которые мы отправляли в запросе
    expect(body.firstname).toBe("Alex");
    expect(body.lastname).toBe("Malh");
    expect(body.totalprice).toBe(100);
    expect(body.depositpaid).toBe(true);
    expect(body.additionalneeds).toBe("Breakfast");
  });

  // 3. Обновление бронирования (Update - PUT)
  test("Update booking", async ({ request }) => {
    // Отправляем POST запрос для получения токена авторизации
    const authResponse = await request.post(`${baseUrl}/auth`, {
      data: {
        username: "admin", // Логин администратора
        password: "password123", // Пароль администратора
      },
    });

    const authBody = await authResponse.json(); // Преобразуем ответ в JSON

    token = authBody.token; // Сохраняем токен

    // Проверяем, что токен получен
    expect(token).toBeTruthy();

    // Отправляем PUT запрос для обновления бронирования
    const response = await request.put(`${baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`, // Передаём токен в Cookie для авторизации
      },
      data: {
        firstname: "Kirill", // Новое имя
        lastname: "Petrov", // Новая фамилия
        totalprice: 200, // Новая цена
        depositpaid: true,
        bookingdates: {
          checkin: "2026-02-01",
          checkout: "2026-02-05",
        },
        additionalneeds: "Lunch", // Новое дополнительно пожелание
      },
    });

    // Проверки
    expect(response.status()).toBe(200); // 1. Статус-код ответа равен 200 ОК

    const body = await response.json();

    // 2. В ответе содержатся обновленные данные.
    expect(body.firstname).toBe("Kirill");
    expect(body.lastname).toBe("Petrov");
    expect(body.totalprice).toBe(200);
    expect(body.depositpaid).toBe(true);
    expect(body.additionalneeds).toBe("Lunch");
  });

  // 4. Удаление бронирования (Delete - DELETE)
  test("Delete booking", async ({ request }) => {
    // Отправляем DELETE запрос для удаления бронирования
    const response = await request.delete(`${baseUrl}/booking/${bookingId}`, {
      headers: {
        // Передаём токен для авторизации
        Cookie: `token=${token}`,
      },
    });

    // Проверки
    expect(response.status()).toBe(201); // 1. Статус-код ответа равен 201 Created

    // Дополнительная проверка:
    const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404); // Проверяем, что сервер возвращает 404 Not Found
  });
});
