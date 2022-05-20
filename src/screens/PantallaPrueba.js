import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
const PantallaPrueba = ({navigation})=>{
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => navigation.goBack("HomeScreen")}
                style={{ paddingRight: 10 }}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>  
        ),

    })
    return(
        <View>
            <Text>Prueba</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('PantallaInicio')}
            >
                <Text>Tocame</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PantallaPrueba;