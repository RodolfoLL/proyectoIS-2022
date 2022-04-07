import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

const HomeScreen = ({navigation}) => {

    return (
        <ScrollView>
            <View style={{
                    fontSize: 30,
                    alignItems: "center",
                    marginTop: "20%"
                }}>
            <TouchableOpacity
                    onPress={() => navigation.navigate("Dosis del medicamento")}
                    style={{
                        backgroundColor: "#FFC300",
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            color: "white",
                        }}
                    >+</Text>
                </TouchableOpacity>
            </View>
           
        </ScrollView>
    );
    }

export default HomeScreen;

const styles = StyleSheet.create({
    textFriends: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600",
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: "grey",
    },
});