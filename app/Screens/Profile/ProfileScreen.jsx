import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../../utils/config';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../../../context/authContext';
import { refreshAuthToken } from '../../../utils/auth';

const ProfileScreen = ({ route, navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const { email, name } = user || route.params.user || {}; // Maneja la ausencia de parámetros

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      try {
        await refreshAuthToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
        // Optionally handle the error, for example by logging out the user
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }
    };

    checkAndRefreshToken();
  }, []);

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      await axios.post(`${config.API_URL}/api/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await AsyncStorage.removeItem('token');
      setUser(null); // Elimina el usuario del contexto
      // Restablece la pila de navegación
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      {email && name ? (
        <>
          <Text style={styles.label}>Nombre: {name}</Text>
          <Text style={styles.label}>Email: {email}</Text>
        </>
      ) : (
        <Text style={styles.label}>Cargando...</Text>
      )}
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
  },
});

export default ProfileScreen;
