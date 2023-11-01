import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pages from './Pages';
import TransferData from './TransferData';
import Home from './Home';
import EmployeeDetails from './EmployeeDetails';

const Stack = createNativeStackNavigator();

const Tabnavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false
        }} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} options={{
          headerShown: true
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Tabnavigation
const styles = StyleSheet.create({})