import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUser(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    // Normalize and trim inputs
    const normalizedEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();

    console.log('Attempting login with:', normalizedEmail);

    try {
      const storedUserStr = await AsyncStorage.getItem('registeredUser');
      // console.log('Stored user found:', storedUserStr); 

      const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;

      if (!storedUser) {
        console.log('No registered user found in storage.');
        setIsLoading(false);
        return { success: false, error: 'Incorrect credentials' };
      }

      const storedEmail = storedUser.email.toLowerCase().trim();
      const storedPass = storedUser.password.trim(); // Ensure password stored is also trimmed/clean

      // Check credentials
      if (storedEmail === normalizedEmail && storedPass === cleanPassword) {
        console.log('Login successful');
        setUser(storedUser);
        await AsyncStorage.setItem('userInfo', JSON.stringify(storedUser));
        setIsLoading(false);
        return { success: true };
      } else {
        Alert.alert('Invalid credentials');
        setIsLoading(false);
        return { success: false, error: 'Incorrect credentials' };
      }
    } catch (e) {
      console.error('Login error:', e);
      setIsLoading(false);
      return { success: false, error: e.message };
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    // Normalize email to lowercase
    const newUser = { name, email: email.toLowerCase(), password };

    try {

      await AsyncStorage.setItem('registeredUser', JSON.stringify(newUser));

      // Auto login after signup
      setUser(newUser);
      await AsyncStorage.setItem('userInfo', JSON.stringify(newUser));

      setIsLoading(false);
      return { success: true };
    } catch (e) {
      setIsLoading(false);
      return { success: false, error: e.message };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userInfo');
      setUser(null);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
