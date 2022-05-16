import React from "react";
import { View, Text, Button } from "react-native";

const Screen5 = ({navigation}) => {
    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "60%"
                }}
            >Pantalla 2</Text>
            <Button title="Ir a Pantalla 4" onPress={()=>navigation.navigate("Screen4")}>

            </Button>
        </View>
    );
    }
export default Screen5;
