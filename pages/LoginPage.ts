import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signinButton: Locator;
  readonly errorMessages: Locator;
  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByPlaceholder("Password");
    this.signinButton = page.getByRole("button", { name: " Sign in " });
    this.errorMessages = page.locator(".error-messages");
  }

  async completeLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
  async clickSignin() {
    await this.signinButton.click();
  }
}
