import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { login, signup, getProducts, deleteProduct, updateProduct, patchProduct } from './apiCalls';

const App = () => {
  useEffect(() => {
    // Example usage of API calls
    const fetchData = async () => {
      try {
        const loginResponse = await login({ username: 'user', password: 'pass' });
        console.log('Login Response:', loginResponse);

        const signupResponse = await signup({ username: 'newUser', password: 'newPass' });
        console.log('Signup Response:', signupResponse);

        const products = await getProducts();
        console.log('Products:', products);

        const productIdToDelete = 123;
        const deleteResponse = await deleteProduct(productIdToDelete);
        console.log('Delete Response:', deleteResponse);

        const productIdToUpdate = 456;
        const updatedData = { name: 'Updated Product' };
        const updateResponse = await updateProduct(productIdToUpdate, updatedData);
        console.log('Update Response:', updateResponse);

        const productIdToPatch = 789;
        const patchedData = { price: 19.99 };
        const patchResponse = await patchProduct(productIdToPatch, patchedData);
        console.log('Patch Response:', patchResponse);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Hello React Native!</Text>
    </View>
  );
};

export default App;
