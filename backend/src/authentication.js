import {
    getData,
    setData
} from './dataStore';

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