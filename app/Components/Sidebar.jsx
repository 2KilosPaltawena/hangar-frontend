import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const DrawerContent = ({ navigation }) => {
  const handleLogout = () => {
    // Elimina el token de AsyncStorage o Context API
    // Navega a la pantalla de inicio de sesión
    navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <Text style={styles.title}>Menú</Text>
        <DrawerItem
          label="Cerrar Sesión"
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default DrawerContent;
