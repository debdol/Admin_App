import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransferData = () => {
    const [token, setToken] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [items, setItems] = useState(false);
    const [items2, setItems2] = useState(false)
    const [id, setId] = useState(null);
    const [id2, setId2] = useState(null);
    // console.log("item :",name);

    const getToken = async () => {
        let item = await AsyncStorage.getItem("token");
        // console.log("token:", item);
        setToken(item);
    }
    useEffect(() => {
        getToken();
    }, [])
    const apiCall = () => {
        if (token) {
            axios.get('http://43.204.88.205:90/list-of-all-emps', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    // console.log("response_in_listOfAllEmploy :", response.data[0].name);
                    if (response.data) {
                        let arr = []
                        response.data.map((item, index) => {
                            let temp = {
                                label: item.name,
                                value: item.id
                            }
                            arr.push(temp)
                            // console.log("Temporary value: ", temp)
                        })
                        setItems(arr);
                        setItems2(arr);
                    }

                })
                .catch((error) => console.log("error_in_listOfAllEmploy :", error))
        }
    }
    useEffect(() => {
        if (token) apiCall();

    }, [token])

    // useEffect(() => {
    //     console.log("Hellooooo: ", value)
    // }, [value])

    const submitHandler = () => {
        if (id && id2) {
            axios.get(`http://43.204.88.205:90/transfer-data-of-emp-to-another/${id}/${id2}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => { console.log("resonse_in_transfer :", res.data) })
                .catch((error) => console.log("error_in_transfer :", error))
        } else {
            Alert.alert("select employee");
        }
    }

    return (
        <View>
            <Text style={{ color: "#000000" }}>TransferData</Text>
            {/* <SelectDropdown
                data={name}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem.id, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />  */}

            {/* <RNPickerSelect
                onValueChange={(value) => console.log("selected: ", value)}
                items={name}
                /> */}
            {items !== false ? (
                <>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onSelectItem={(item) => {
                            console.log("item :", item);
                            setId(item.value)
                        }}
                        style={{ marginBottom: "20%" }}
                    />
                </>
            ) : null}
            {items2 !== false ? (
                <>
                    <DropDownPicker
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems}
                        onSelectItem={(item) => {
                            setId2(item.value);
                            console.log("item2 :", item);
                        }}
                    />
                </>
            ) : null}
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={submitHandler}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({})
export default TransferData