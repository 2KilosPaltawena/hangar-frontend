import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/Screens/Auth/LoginScreen';
import ProfileScreen from './app/Screens/Profile/ProfileScreen';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, AuthContext } from './context/authContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isLoading, user }) => (
          <NavigationContainer>
            {isLoading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <Stack.Navigator initialRouteName={user ? 'Profile' : 'Login'}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;
