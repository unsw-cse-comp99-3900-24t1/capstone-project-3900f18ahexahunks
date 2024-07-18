const { adminAuthLogin, adminAuthRegister, resetUsername, resetPassword } = require('../authentication');

test('Check successful registration', async () => {
    const response = await adminAuthRegister('zhecheng456@unsw.edu.au', 'Yzc132', 'Yzc132', 'Yzc132');

    // Check if user object is correct and includes hashed password
    expect(response).toMatchObject({
        token: expect.any(String),
        user: {
            email: 'zhecheng456@unsw.edu.au',
            username: 'Yzc132',
            hashedPassword: expect.any(String)
        }
    });
}, 3000);

test('Wrong password registration', async () => {
    const user = await adminAuthRegister('yzc@unsw.edu.au', 'Uzc2312388955', '666', '777');
    
    expect(user).toEqual({ error: "Passwords do not match" });
}, 3000);

test('Successful login with correct credentials', async () => {
    await adminAuthRegister('zhecheng456@unsw.edu.au', 'Yzc132', 'Yzc132', 'Yzc132');
  
    const response = await adminAuthLogin('zhecheng456@unsw.edu.au', 'Yzc132');
    
    console.log('Login response:', response);

    // Check if token is present and is a string
    expect(response).toHaveProperty('token');
    expect(typeof response.token).toBe('string');

    // Check if user object is correct without the password
    expect(response).toMatchObject({
        user: {
            email: 'zhecheng456@unsw.edu.au',
            username: 'Yzc132'
        }
    });

    // Check that password is not included in the response
    expect(response.user.password).toBeUndefined();
}, 30000);

test('Login attempt with incorrect email', async () => {
    const response = await adminAuthLogin('wrong@example.com', 'Test@123');
    expect(response).toEqual({ error: "Invalid Email or password" });
}, 30000);

test('Successful username reset', async () => {
    // First, register a user
    await adminAuthRegister('user@unsw.edu.au', 'username123', 'password123', 'password123');

    // Then, reset the username
    const response = await resetUsername('user@unsw.edu.au', 'newusername');
    expect(response).toEqual({ message: "Username updated successfully" });
}, 30000);

test('Attempt to reset username for non-existent user', async () => {
    const response = await resetUsername('nonexistent@user.com', 'newusername');
    expect(response).toEqual({ error: "User not found" });
}, 30000);

test('Successful password reset', async () => {
    await adminAuthRegister('zhecheng666666666@unsw.edu.au', 'username123', 'password123', 'password123');
    await adminAuthLogin('zhecheng666666666@unsw.edu.au', 'password123');

    const response = await resetPassword('zhecheng666666666@unsw.edu.au', 'password123', 'Yzc66666666');
    expect(response).toEqual({ message: "Password updated successfully" });
}, 30000);

test('Failed password reset', async () => {
    await adminAuthRegister('zhecheng666666666@unsw.edu.au', 'username123', 'password123', 'password123');
    await adminAuthLogin('zhecheng666666666@unsw.edu.au', 'password123');

    const response = await resetPassword('zhecheng666666666@unsw.edu.au', 'wrongpassword', 'Yzc66666666');
    expect(response).toEqual({ error: "Incorrect current password" });
}, 30000);

  test('Successful username reset', async () => {
    // First, register a user
    await adminAuthRegister('user@unsw.edu.au', 'username123', 'password123', 'password123');

    // Then, reset the username
    const response = await resetUsername('user@unsw.edu.au', 'newusername');
    expect(response).toEqual({ message: "Username updated successfully" });

  }, 30000);

  test('Attempt to reset username for non-existent user', async () => {
    const response = await resetUsername('nonexistent@user.com', 'newusername');
    expect(response).toEqual({ error: "User not found" });
  }, 30000);
