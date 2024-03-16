import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { login, signup, getProducts, deleteProduct, updateProduct, patchProduct } from './apiCalls';
import Toast from 'react-native-toast-message';

const App = () => {
  const showToast = (message, type) => {
    Toast.show({
      text1: message,
      type: type,
    });
  };

  useEffect(() => {
    // Example usage of API calls
    const fetchData = async () => {
      try {
        const loginResponse = await login({ username: 'user', password: 'pass' });
        if (loginResponse.status === 200) {
          showToast('Login successful!', 'success');
        } else {
          showToast('Login failed!', 'error');
        }

        // Similar checks for other API calls
      } catch (error) {
        showToast('API Error', 'error');
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Hello React Native!</Text>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default App;
