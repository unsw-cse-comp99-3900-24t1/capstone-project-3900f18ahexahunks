import { adminAuthLogin } from '../authentication';

describe('Tests for authAdminLogin', () => {
    beforeEach(() => {
        clear();
    });

    test("Successfully logged in", () => {
        const user = adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345abcde");
        const logIn = adminAuthLogin("zhechengyao123@gmail.com", "12345abcde");
        expect(logIn.email).toStrictEqual(user.email)
		expect(logIn.password).toStrictEqual(user.password)
    });

    test("Password is not correct for the given email", () => {
        beforeEach(() => {
            clear();
        });
    
        const user = adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345abcde");
        const logIn = adminAuthLogin("zhechengyao123@gmail.com", "wrongpassword");
        expect(logIn).toStrictEqual({ error: "Invalid Email or password" });
    });

    test('Email address does not exist', () => {
        beforeEach(() => {
            clear();
        });
    
        const user = adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345abcde");
        const logIn = adminAuthLogin("wrong@gmail.com", "12345abcde");
        expect(logIn).toStrictEqual({ error: "Invalid Email or password" });
    });

});
