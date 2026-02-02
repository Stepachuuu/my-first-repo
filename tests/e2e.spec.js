import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test("@ui Покупка на saucedemo.com", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckoutStepOnePage(page);
  const checkoutStepTwo = new CheckoutStepTwoPage(page);
  const checkoutComplete = new CheckoutCompletePage(page);

  // 1. Открыть страницу логина
  await loginPage.open();

  // 2. Залогиниться
  await loginPage.login("standard_user", "secret_sauce");

  // 3. Проверка страницы после логина
  const pageTitle = await inventoryPage.getPageTitle();
  await expect(pageTitle).toBe("Products");

  // 4. Добавить самый дорогой товар
  const addedItemName = await inventoryPage.addMostExpensiveItemToCart();

  // 5. Открыть корзину
  await inventoryPage.openCart();

  // 6. Проверить товар в корзине
  const cartItemName = await cartPage.getCartItemName();
  await expect(cartItemName).toBe(addedItemName);

  // 7. Нажать "Checkout"
  await cartPage.goToCheckout();

  // 8–9. Заполнение данных и нажатие кнопки "Continue"
  await checkoutStepOne.fillUserInfo("Test", "User", "12345");

  // 10. Завершение покупки
  await checkoutStepTwo.finishCheckout();

  // 11. Проверка, что заказ успешно оформлен
  const completionMessage = await checkoutComplete.getCompletionMessage();
  await expect(completionMessage).toBe("Thank you for your order!");
});
