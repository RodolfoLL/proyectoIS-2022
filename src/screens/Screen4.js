import React from "react";
import { View, Text, Button,TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

const Screen4 = ({navigation}) => {
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => navigation.goBack("HomeScreen")}
                style={{ paddingRight: 10 }}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>  
        ),

    })
    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Pantalla 4</Text>
            <Button title="Ir a Pantalla 5" onPress={()=>navigation.navigate("Screen5")}>

            </Button>
        </View>
    );
    }

export default Screen4;