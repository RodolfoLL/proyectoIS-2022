import React from 'react';
import { View, Text, Button } from "react-native";

const Login = ({navigation}) => {
    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Login</Text>
            <Button title="Ir a Pantalla 3" onPress={() => navigation.navigate("HomeScreen")}>

            </Button>
        </View>
    );
    }

export default Login;