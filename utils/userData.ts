export function generateUser() {
  const timestamp = Date.now();

  return {
    username: `user${timestamp}`,
    email: `user${timestamp}@test.com`,
    password: "Parola1234!",
  };
}
