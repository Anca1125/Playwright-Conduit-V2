import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;
  readonly errorMessage: Locator;
  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder("Username");
    this.emailInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByPlaceholder("Password");
    this.signupButton = page.getByRole("button", { name: "Sign up" });
    this.errorMessage = page.locator(".error-messages");
  }

  async fillRegisterForm(username: string, email: string, password: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickSignUp() {
    await this.signupButton.click();
  }
}
