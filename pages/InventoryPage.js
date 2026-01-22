export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = ".title";
    this.sort = ".product_sort_container";
    this.buttonAddToCart = ".inventory_item button";
    this.firstItemName = ".inventory_item_name";
    this.cartIcon = ".shopping_cart_link";
  }

  async getPageTitle() {
    return await this.page.textContent(this.title);
  }

  async addMostExpensiveItemToCart() {
    await this.page.selectOption(this.sort, "hilo"); // Сортируем по цене (от дорогого к дешевому)
    const itemName = await this.page.textContent(this.firstItemName); // Запоминаем имя товара
    await this.page.click(this.buttonAddToCart);
    return itemName;
  }

  async openCart() {
    await this.page.click(this.cartIcon);
  }
}
