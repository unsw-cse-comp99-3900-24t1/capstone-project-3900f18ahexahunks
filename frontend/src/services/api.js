// ACTUAL TO BE USED AFTER BACKEND CREATED
// import apiClient from './client';

// // Performs login operation using the provided credentials.
// export const login = async (data) => {
//   return await apiClient.post('/login', data);
// };

// // Registers a new user with the given data.
// export const register = async (data) => {
//   try {
//     return await apiClient.post('/register', data);
//   } catch (e) {
//     return { error: true, e };
//   }
// };

// FAKE USING WHILE BACKEND WORK IN PROGRESS
import apiClient from './client';
import CryptoJS from 'crypto-js';

// Utility function to generate SHA256 token
const generateToken = (user) => {
  const data = `${user.id}:${user.name}:${user.email}`;
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

// Utility function to simulate delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mocked API client for fake responses with delay
const mockApiClient = {
  post: async (url, data) => {
    await delay(1000); // Simulate a delay of 1 second

    if (url === '/login') {
      const fakeUser = { id: '1', name: 'Test User', email: data.email };
      return { data: { user: fakeUser, token: generateToken(fakeUser) } };
    }
    if (url === '/register') {
      const fakeUser = { id: '2', name: data.name, email: data.email };
      return { data: { user: fakeUser, token: generateToken(fakeUser) } };
    }
    throw new Error('Unknown URL');
  },
};

// Performs login operation using the provided credentials.
export const login = async (data) => {
  return await mockApiClient.post('/login', data);
};

// Registers a new user with the given data.
export const register = async (data) => {
  try {
    return await mockApiClient.post('/register', data);
  } catch (e) {
    return { error: true, e };
  }
};
