import { clear, createUser } from '../dataStore';
import { adminAuthLogin, adminAuthRegister } from '../authentication';

describe('Tests for adminAuthLogin', () => {
  beforeEach(() => {
    clear();
    adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345abcde");
  });

  test("Successfully logged in", () => {
    const logIn = adminAuthLogin("zhechengyao123@gmail.com", "12345abcde");
    const userCreated = createUser("zhechengyao123@gmail.com", "12345abcde")
    expect(userCreated.email).toBe("zhechengyao123@gmail.com");
    expect(userCreated.password).toBe("12345abcde");
  });

  test("Password is not correct for the given email", () => {
    const logIn = adminAuthLogin("zhechengyao123@gmail.com", "wrongpassword");
    expect(logIn).toStrictEqual({ error: "Invalid Email or password" });
  });

  test('Email address does not exist', () => {
    const logIn = adminAuthLogin("wrong@gmail.com", "12345abcde");
    expect(logIn).toStrictEqual({ error: "Invalid Email or password" });
  });
});
