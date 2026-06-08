import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";
import { generateUser } from "../utils/userData";

test.describe("signup tests", () => {
  let signUpPage: SignUpPage;
  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);

    await signUpPage.navigate("https://conduit.bondaracademy.com/register");
  });
  test("user can register with valid credentials", async ({ page }) => {
    const user = generateUser();

    await signUpPage.fillRegisterForm(user.username, user.email, user.password);
    await signUpPage.clickSignUp();

    await expect(page).toHaveURL("https://conduit.bondaracademy.com/");
  });

  test("user can not register with credentials already used", async () => {
    await signUpPage.fillRegisterForm(
      "Erzilia",
      "erzilia@test.com",
      "ParolaErzilia1",
    );
    await signUpPage.clickSignUp();

    await expect(signUpPage.errorMessage).toBeVisible();
    await expect(signUpPage.errorMessage).toContainText(
      "email has already been taken",
    );
    await expect(signUpPage.errorMessage).toContainText(
      "username has already been taken",
    );
  });

  test("user can not register with an invalid email", async () => {
    await signUpPage.fillRegisterForm("Isabela", "isabela.io", "ParolaIsabela");
    await signUpPage.clickSignUp();

    await expect(signUpPage.errorMessage).toContainText("email is invalid");
  });

  test("user can not register with a password with less than 8 characters", async () => {
    await signUpPage.fillRegisterForm(
      "Florendana",
      "florendana@test.com",
      "Paro",
    );
    await signUpPage.clickSignUp();

    await expect(signUpPage.errorMessage).toContainText(
      "password is too short (minimum is 8 characters)",
    );
  });

  test("user can not register without username", async () => {
    await signUpPage.fillRegisterForm("", "saveta@test.com", "parolaSaveta");

    await expect(signUpPage.signupButton).toBeDisabled();
  });

  test("user can not register without email", async () => {
    await signUpPage.fillRegisterForm("Saveta", "", "parolaSaveta");

    await expect(signUpPage.signupButton).toBeDisabled();
  });

  test("user can not register without password", async () => {
    await signUpPage.fillRegisterForm("Saveta", "saveta@test.com", "");

    await expect(signUpPage.signupButton).toBeDisabled();
  });
});
