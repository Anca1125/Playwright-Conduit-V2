import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("login functionality", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.navigate("https://conduit.bondaracademy.com/login");
  });

  test("user can login with valid credentials", async ({ page }) => {
    await loginPage.completeLoginForm("loredana@test.com", "Loredana123");
    await loginPage.clickSignin();

    await expect(page).toHaveURL("https://conduit.bondaracademy.com/");
  });

  test("user can not login with invalid credentials", async () => {
    await loginPage.completeLoginForm("Alexandru@test.com", "Alexandru123");
    await loginPage.clickSignin();

    await expect(loginPage.errorMessages).toBeVisible();
    await expect(loginPage.errorMessages).toContainText(
      "email or password is invalid",
    );
  });

  test("user can not login with invalid email", async () => {
    await loginPage.completeLoginForm("loredana.ro", "Loredana123");
    await loginPage.clickSignin();

    await expect(loginPage.errorMessages).toBeVisible();
    await expect(loginPage.errorMessages).toContainText(
      "email or password is invalid",
    );
  });

  test("user can not login with an invalid password", async () => {
    await loginPage.completeLoginForm("loredana@test.com", "LOREDANA123");
    await loginPage.clickSignin();

    await expect(loginPage.errorMessages).toBeVisible();
    await expect(loginPage.errorMessages).toContainText(
      "email or password is invalid",
    );
  });

  test("user can not login with empty fields", async () => {
    await loginPage.completeLoginForm("", "");

    await expect(loginPage.signinButton).toBeDisabled();
  });

  test("user can not login without email", async () => {
    await loginPage.completeLoginForm("", "Loredana123");

    await expect(loginPage.signinButton).toBeDisabled();
  });

  test("user can not login without password", async () => {
    await loginPage.completeLoginForm("loredana@test.com", "");

    await expect(loginPage.signinButton).toBeDisabled();
  });
});
