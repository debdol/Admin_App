import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Pages from './Pages';
import TransferData from './TransferData';

const Home = () => {
    const [pageReplacing, setPageReplacing] = useState(<Pages />);

    const pageReplacingHandler = (data) => {
        if (data === "Pages") {
            setPageReplacing(<Pages />)
        } else if (data === "TransferData") {
            setPageReplacing(<TransferData />)
        }
    }
    return (
        <View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                <TouchableOpacity onPress={() => pageReplacingHandler("Pages")}>
                    <Text>List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pageReplacingHandler("TransferData")}>
                    <Text>Transfer Data</Text>
                </TouchableOpacity>
            </View>
            {pageReplacing}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})