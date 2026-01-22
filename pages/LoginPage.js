export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "#user-name"; // Засовываем селекторы в переменные
    this.passwordInput = "#password";
    this.loginButton = "#login-button";
    this.errorMessage = '[data-test="error"]';
  }

  async open() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
