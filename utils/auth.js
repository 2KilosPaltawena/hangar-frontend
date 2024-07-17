import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from './config';

export const refreshAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.post(`${config.API_URL}/api/refresh-token`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const newToken = response.data.token;
    await AsyncStorage.setItem('token', newToken);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};
