import axios from 'axios';
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

export const pdfToUblConvert = async (formData) => {
  try {
    const response = await apiClient.post('/convert/upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

export const validateUBL = async (formData) => {
  try {
    const response = await apiClient.post('/validate/validate-ubl', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

const API_KEY = 'ac9b9c9cdde741b99b310610242006';
export const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      'http://api.weatherapi.com/v1/current.json',
      {
        params: {
          key: API_KEY,
          q: `${lat},${lon}`,
          aqi: 'no',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export async function getThoughtOfTheDay() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://thought-of-the-day.p.rapidapi.com/thought',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-ua': 'RapidAPI-Playground',
        'x-rapidapi-key': '932c70556bmshcd7268d8daf9f23p1fc442jsnb178dc8066e1',
        'x-rapidapi-host': 'thought-of-the-day.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    console.error('There was a problem with your fetch request:', error);
    return null;
  }
}
