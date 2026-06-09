import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NewArticlePage extends BasePage {
  readonly newArticleLink: Locator;
  readonly articleTitle: Locator;
  readonly articleDescription: Locator;
  readonly articleBody: Locator;
  readonly articleTag: Locator;
  readonly publishArticleButton: Locator;
  readonly editArticle: Locator;
  readonly deleteArticle: Locator;
  readonly postComment: Locator;
  readonly textarea: Locator;
  readonly postedComment: Locator;

  constructor(page: Page) {
    super(page);
    this.newArticleLink = page.getByRole("link", { name: " New Article" });
    this.articleTitle = page.getByPlaceholder("Article Title");
    this.articleDescription = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBody = page.getByPlaceholder(
      "Write your article (in markdown)",
    );
    this.articleTag = page.getByPlaceholder("Enter tags");
    this.publishArticleButton = page.getByRole("button", {
      name: "Publish Article",
    });
    this.editArticle = page.getByRole("link", { name: "Edit Article" }).first();
    this.deleteArticle = page
      .getByRole("button", { name: "Delete Article" })
      .first();
    this.postComment = page.getByRole("button", { name: "Post Comment" });
    this.textarea = page.getByPlaceholder("Write a comment...");
    this.postedComment = page.locator(".card-text");
  }

  async completeArticle(
    title: string,
    description: string,
    body: string,
    tags: string,
  ) {
    await this.articleTitle.fill(title);
    await this.articleDescription.fill(description);
    await this.articleBody.fill(body);
    await this.articleTag.fill(tags);
  }

  async clickOnPublishArticle() {
    await this.publishArticleButton.click();
  }

  async postAcomment(value: string) {
    await this.textarea.fill(value);
    await this.postComment.click();
  }
}
