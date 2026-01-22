export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = ".complete-header";
  }

  async getCompletionMessage() {
    return this.page.textContent(this.completeHeader);
  }
}
