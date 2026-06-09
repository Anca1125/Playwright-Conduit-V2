import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { NewArticlePage } from "../pages/NewArticlePage";
import { generateTitle } from "../utils/userData";

export async function createArticle(page: Page) {
  const loginPage = new LoginPage(page);
  const newArticlePage = new NewArticlePage(page);

  const newTitle = generateTitle();

  await loginPage.navigate("https://conduit.bondaracademy.com/login");

  await loginPage.completeLoginForm("loredana@test.com", "Loredana123");

  await loginPage.clickSignin();

  await newArticlePage.newArticleLink.click();

  await newArticlePage.completeArticle(
    newTitle.title,
    "About Playwright",
    "Playwright is a tool for automation",
    "Playwright, test",
  );

  await newArticlePage.clickOnPublishArticle();

  return newTitle.title;
}
