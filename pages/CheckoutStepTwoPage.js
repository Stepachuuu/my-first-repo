export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.finishButton = '[data-test="finish"]';
  }

  async finishCheckout() {
    await this.page.click(this.finishButton);
  }
}
