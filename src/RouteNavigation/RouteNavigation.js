import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screen/Home/HomeScreen';
import UploadImage from '../Screen/UploadImage/UploadImage';
import PhotoList from '../Screen/PhotoList/Photolist';
import MyFavourite from '../Screen/Favourite/MyFavourite';

const Stack = createStackNavigator();

export default Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadImage"
        component={UploadImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhotoList"
        component={PhotoList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyFavourite"
        component={MyFavourite}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
