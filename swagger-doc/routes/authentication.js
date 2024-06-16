import {
    getData,
    setData
} from './dataStore';

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 */

// Define the adminAuthLogin function
export function adminAuthLogin(email, password) {
    const dataStore = getData();
    let findEmail = false; 
    let authUserIndex = 0;
  
    // Find the index of the user
    for (const index in dataStore.users) {
      if (dataStore.users[index].email === email) {
        findEmail = true;
        authUserIndex = index;
        break;
      }
    }
  
    // Check if the email was found and if the password is correct
    if (!findEmail) {
      return { error: "Invalid Email or password" };
    } else if (dataStore.users[authUserIndex].password !== password) {
      return { error: "Invalid Email or password" };
    } else {
        // Simulate a server error scenario
        if (Math.random() < 0.1) { // 10% chance of a server error
            return { error: "Please try again later" };
        }
        return {
            "email ": email,
            "password ": password
        };
    }
};

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Authentication)
 *   description: The Invoice management service (Authentication)
 * /login:
 *   post:
 *     summary: Logs registered user into the website
 *     tags: [E-invoicing (Authentication)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       400:
 *         description: Invalid Email or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid Email or password
 *       500:
 *         description: Some server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Please try again later
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - password-check
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *         password-check:
 *           type: string
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 *         password-check: 'password123'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Authentication)
 *   description: The Invoice management service (Authentication)
 * /register:
 *   post:
 *     summary: Logs registered user into the website
 *     tags: [E-invoicing (Authentication)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       400:
 *         description: Invalid Email or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid Email or password
 *       402:
 *         description: Passwords do not match
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Passwords do not match
 *       500:
 *         description: Some server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Please try again later
 */

// Define the adminAuthRegister function
export function adminAuthRegister(email, password, passwordCheck) {
    const dataStore = getData();
    let findEmail = false; 
    let authUserIndex = 0;
  
    // Find the index of the user
    for (const index in dataStore.users) {
      if (dataStore.users[index].email === email) {
        findEmail = true;
        authUserIndex = index;
        break;
      }
    }
  
    // Check if the email was found and if the password is correct
    if (!findEmail) {
      return { error: "Invalid Email or password" };
    } else if (dataStore.users[authUserIndex].password !== password) {
      return { error: "Invalid Email or password" };
    } else if (dataStore.users[authUserIndex].password !== passwordCheck) {
        return { error: "Passwords do not match" };
    }
    else {
        // Simulate a server error scenario
        if (Math.random() < 0.1) { // 10% chance of a server error
            return { error: "Please try again later" };
        }
        return {
            "email ": email,
            "password ": password,
            "password-check": passwordCheck
        };
    }
};
