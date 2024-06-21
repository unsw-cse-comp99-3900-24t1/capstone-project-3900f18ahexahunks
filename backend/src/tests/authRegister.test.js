import { clear, createUser } from '../dataStore';
import { adminAuthRegister } from '../authentication';

describe('Tests for adminAuthRegister', () => {
  test("Successfully registered", () => {
    clear();
    const user = adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345abcde");
    const userCreated = createUser("zhechengyao123@gmail.com", "12345abcde")
    expect(userCreated.email).toBe("zhechengyao123@gmail.com");
    expect(userCreated.password).toBe("12345abcde");
  });

  test("Passwords do not match", () => {
    clear();
    const user = adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "wrongpassword");
    expect(user).toStrictEqual({ error: "Invalid Email or password" });
  });

  test('Email already exists', () => {
    clear();
    adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345abcde");
    const user = adminAuthRegister("zhechengyao123@gmail.com", "anotherpassword", "anotherpassword");
    expect(user).toStrictEqual({ error: "Invalid Email or password" });
  });
});
