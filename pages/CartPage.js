export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = ".cart_item";
    this.checkoutButton = "#checkout";
  }

  async getCartItemName() {
    return this.page.textContent(".inventory_item_name");
  }

  async goToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}
