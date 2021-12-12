import React from 'react';
import Navigation from "./src/RouteNavigation/RouteNavigation"
import { NavigationContainer } from '@react-navigation/native';



const App= () => {
  return (
    <NavigationContainer>
    <Navigation/>
   </NavigationContainer>
  );
};



export default App;
