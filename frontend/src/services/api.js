import apiClient from './client';

// // Performs login operation using the provided credentials.
// export const login = async (data) => {
//   try {
//     const response = await apiClient.post('/auth/login', data);
//     return response.data;
//   } catch (error) {
//     // Handle different error statuses or default to a generic error message
//     // const errorMessage =
//     //   error.response && error.response.data
//     //     ? error.response.data.message
//     //     : 'Something went wrong';
//     return { error: true, message: error };
//   }
// };

// // Registers a new user with the given data.
// export const register = async (data) => {
//   try {
//     const response = await apiClient.post('/auth/register', data);
//     return response.data;
//   } catch (error) {
//     // Handle different error statuses or default to a generic error message
//     const errorMessage =
//       error.response && error.response.data
//         ? error.response.data.message
//         : 'Something went wrong';
//     return { error: true, message: errorMessage };
//   }
// };

export const login = async (data) => {
  try {
    return await apiClient.post('/auth/login', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};
