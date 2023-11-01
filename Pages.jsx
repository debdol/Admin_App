import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { listOfAllEmploies } from './Api';

const Pages = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState();
    const [employList, setEmployList] = useState();


    const getToken = async () => {
        let item = await AsyncStorage.getItem("token");
        setToken(item);
    }
    useEffect(() => {
        getToken();
    }, [])

    const apiCall = () => {
        axios.get('http://43.204.88.205:90/list-of-all-emps', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("response_in_listOfAllEmploy :", response.data);
                setEmployList(response.data);
            })
            .catch((error) => console.log("error_in_listOfAllEmploy :", error))
    }

    useEffect(() => {
        if (token) {
            apiCall();
        }
    }, [token])

    const deleteEmployee = (id) => {
        console.log("id", id);
        // axios.delete(`http://43.204.88.205:90/delete-employee/${id}`, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then((response) => {
        //         // console.log("response_in_delete_employee :", response.data);
        //         apiCall();
        //     })
        //     .catch((error) => console.log("error_in_delete_employee :", error))
    }

    const dataIncrease = (id) => {
        axios.get(`http://43.204.88.205:90/data-increase/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("response_in_dataIncrease", response.data);
            })

    }

    const employListHandler = (item, index) => {
        return (
            <View style={{ flexDirection: "row", borderWidth: 1, borderColor: "red", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ padding: 5 }}>
                    <Text style={{ color: "#000000" }}>{item.item.name} :</Text>
                    <Text style={{ color: "#000000" }}>{item.item.mobile_number}</Text>
                    <Text style={{ color: "#000000" }}>{item.item.orders_count}</Text>
                    {/* <Text style={{ color: "#000000" }}>{item.item.order_limit.}</Text> */}
                </View>
                <TouchableOpacity onPress={() => dataIncrease(item.item.id)}>
                    <Text style={{ color: "#000000" }}>Data Increase</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("EmployeeDetails", { employeeDetails: item.item })}>
                    <Text style={{ color: "#000000", borderWidth: 1, borderColor: "blue", padding: 5 }}>Employee Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteEmployee(item.item.id)}>
                    <Text style={{ color: "black" }}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ height: 800}}>
            <Text style={{ color: "#000000", alignSelf: "center" }}>List</Text>
            <FlatList keyExtractor={(item, index) => index} data={employList} renderItem={(item, index) => employListHandler(item, index)} style={{}} />
        </View>
    )
}


const styles = StyleSheet.create({})
export default Pages;