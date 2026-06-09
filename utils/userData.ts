export function generateUser() {
  const timestamp = Date.now();

  return {
    username: `user${timestamp}`,
    email: `user${timestamp}@test.com`,
    password: "Parola1234!",
  };
}

export function generateTitle() {
  const uniqueTitle = Date.now();

  return {
    title: `Playwright ${uniqueTitle} is awsome`,
  };
}
