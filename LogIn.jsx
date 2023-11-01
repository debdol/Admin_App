import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NetworkInfo } from 'react-native-network-info';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adminLogin } from './Api';
// let temp = await AsyncStorage.getItem('marhchant_id');
// AsyncStorage.removeItem('marhchant_id');
// AsyncStorage.setItem('marhchant_id', res.data.data.merchantTransactionId);

const LogIn = () => {
    const [emailOrNumber, setEmailOrNumber] = useState();
    const [password, setPassword] = useState();
    const [ip, setIp] = useState();
    useEffect(() => {
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            // console.log("ipv4Address:", ipv4Address);
            setIp(ipv4Address);
        });
    }, [])
    const logInHandler = () => {
        axios.post(adminLogin, {
            email_phone: emailOrNumber,
            password: password,
            ip: ip
        })
            .then((response) => {
                console.log("response_in_login:", response.data.token);
                AsyncStorage.setItem("token", response.data.token);
            })
            .catch((error) => console.log("error_in_login :", error))

    }
    return (
        <View>
            <TextInput placeholder='write your mail id or phone number' onChangeText={(e) => setEmailOrNumber(e)} />
            <TextInput placeholder='write your password' onChangeText={(e) => setPassword(e)} />
            <TouchableOpacity onPress={logInHandler}>
                <Text style={{ color: "#000000" }}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogIn

const styles = StyleSheet.create({})