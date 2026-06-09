import { test, expect } from "@playwright/test";
import { NewArticlePage } from "../pages/NewArticlePage";
import { LoginPage } from "../pages/LoginPage";
import { generateTitle } from "../utils/userData";
import { createArticle } from "../utils/articleHelper";

test("user can write and publish new articles", async ({ page }) => {
  const newArticlePage = new NewArticlePage(page);
  const loginPage = new LoginPage(page);
  const newTitle = generateTitle();

  await loginPage.navigate("https://conduit.bondaracademy.com/login");
  await loginPage.completeLoginForm("loredana@test.com", "Loredana123");
  await loginPage.clickSignin();

  await expect(page).toHaveURL("https://conduit.bondaracademy.com/");

  await newArticlePage.newArticleLink.click();
  await newArticlePage.completeArticle(
    newTitle.title,
    "About Playwright",
    "Playwright is a tool for automation",
    "Playwright, test",
  );
  await newArticlePage.clickOnPublishArticle();

  await expect(page).toHaveURL(/article/);
  await expect(page.locator("h1")).toContainText(newTitle.title);
});

test("user can edit the article", async ({ page }) => {
  const articleTitle = await createArticle(page);
  const newArticlePage = new NewArticlePage(page);
  const newTitle = generateTitle();

  await newArticlePage.editArticle.click();
  await newArticlePage.completeArticle(
    newTitle.title,
    "All about Playwright",
    "Playwright is for automation",
    "Playwright, test, automation",
  );
  await newArticlePage.clickOnPublishArticle();
  await expect(page.locator("h1")).toContainText(newTitle.title);
});

test("user can delete the article", async ({ page }) => {
  const articleTitle = await createArticle(page);
  const newArticlePage = new NewArticlePage(page);
  const newTitle = generateTitle();

  await newArticlePage.deleteArticle.click();

  await expect(page).toHaveURL("https://conduit.bondaracademy.com/");
});

test("user can post a comment for the article", async ({ page }) => {
  const articleTitle = await createArticle(page);
  const newArticlePage = new NewArticlePage(page);

  await newArticlePage.postAcomment("I agree");

  await expect(newArticlePage.postedComment).toContainText("I agree");
});
