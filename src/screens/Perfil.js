import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';

const Perfil = ({navigation})=>{
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{ paddingRight: 10 }}
            >
                <Feather name="menu" size={24} color="white" />
            </TouchableOpacity>  
        ),

    })
    return(
        <View>
            <Text>Perfil</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Prueba')}
            >
                <Text>Tocame</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Perfil;