import React from "react";
import { View, Text, Button } from "react-native";

const Screen2 = ({navigation}) => {
    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Pantalla 2</Text>
            <Button title="Ir a Pantalla 3" onPress={() => navigation.navigate("Screen3")}>

            </Button>
        </View>
    );
    }

export default Screen2;