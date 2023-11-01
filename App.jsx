import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import LogIn from './LogIn';
import Pages from './Pages';
import Tabnavigation from './Tabnavigation';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';

const App = () => {
  const [token, setToken] = useState(false);
  const [mainPage, setMainPage] = useState(<Pages />);
  const getToken = async () => {
    let item = await AsyncStorage.getItem("token");
    // console.log("token:", item);
    setToken(item);
  }
  useEffect(() => {
    setInterval(() => {
      getToken();
    }, 5000);
    // AsyncStorage.removeItem("token")
  }, [])
  if (token) {
    return (
      <View style={{ flex: 1 }}>
        <Tabnavigation />
      </View>
    )
  } else {
    return (
      <LogIn />
    )
  }

}


const styles = StyleSheet.create({})
export default App