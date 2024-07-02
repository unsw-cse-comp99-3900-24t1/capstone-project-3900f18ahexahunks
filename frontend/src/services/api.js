import axios from 'axios';
import apiClient from './client';

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

export const forgotPassword = async (data) => {
  try {
    return await apiClient.post('/auth/forgot-password', data);
  } catch (e) {
    return { error: true, data: e.response.data };
  }
};

export const resetPassword = async (data) => {
  try {
    return await apiClient.post('/auth/reset-password', data);
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
    console.log(response);
    return response.data;
  } catch (error) {
    return { error: true, data: error.response.data };
  }
};

export const getAllValidationUblInfo = async (data) => {
  try {
    const response = await apiClient.get('/validate/get-all-validation-data', {
      params: { userId: data.userId },
    });
    console.log(response.data);
    return response.data.ublValidation;
  } catch (error) {}
};

export const getAnyFile = async (data) => {
  try {
    const response = await apiClient.get('/getFile', {
      params: { fileId: data.fileId },
      responseType: 'arraybuffer',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {}
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

const STORAGE_KEY = 'thoughtOfTheDay';
export async function getThoughtOfTheDay() {
  try {
    const cachedThought = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (cachedThought) {
      const { timestamp, thought } = cachedThought;

      if (isSameDay(new Date(timestamp), new Date())) {
        return thought;
      }
    }

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

    const thought = response.data;
    const currentTimestamp = new Date().getTime();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ timestamp: currentTimestamp, thought })
    );

    return thought;
  } catch (error) {
    console.error('There was a problem with your fetch request:', error);
    return null;
  }
}

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
