import { adminAuthRegister } from '../authentication';

test('Check successful regisration', () => {
    clear();
  
    let user = adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345abcde");
  
    expect(user).toMatchObject({ 
        "email ": "zhechengyao123@gmail.com",
        "password ": "12345abcde"
    });
});

test('Check fail on wrong in email format', () => {
    clear();
  
    let user1 = adminAuthRegister("123", "12345abcde", "12345abcde");
    expect(user1).toMatchObject({ error: "Invalid Email or password" });
});

test('Check fail on wrong in password format', () => {
    clear();
  
    let user1 = adminAuthRegister("zhechengyao123@gmail.com", "12345abcde", "12345");
    expect(user1).toMatchObject({ error: "Invalid Email or password" });
});
