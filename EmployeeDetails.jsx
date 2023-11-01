import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const EmployeeDetails = ({ route }) => {
    const [paramss, setParamss] = useState();
    useEffect(() => {
        if (route.params) {
            setParamss(route.params.employeeDetails);
        }
    }, [route.params])
    if (paramss) {
        return (
            <View>
                <View style={styles.keyValueStyle}>
                    <Text style={styles.txt}>Name :</Text>
                    <Text style={styles.txt}>{paramss.name}</Text>
                </View>
                <View style={styles.keyValueStyle}>
                    <Text style={styles.txt}>Address :</Text>
                    <Text style={styles.txt}>{paramss.address}</Text>
                </View>
                <View style={styles.keyValueStyle}>
                    <Text style={styles.txt}>Mobile Number :</Text>
                    <Text style={styles.txt}>{paramss.mobile_number}</Text>
                </View>
                <View style={styles.keyValueStyle}>
                    <Text style={styles.txt}>order Limit :</Text>
                    <Text style={styles.txt}>{Object.values(paramss.order_limit)}</Text>
                </View>
                <View style={styles.keyValueStyle}>
                    <Text style={styles.txt}>Order Count :</Text>
                    <Text style={styles.txt}>{paramss.orders_count}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    keyValueStyle: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: "5%"
    },
    txt: {
        color: "#000000"
    }
})
export default EmployeeDetails;