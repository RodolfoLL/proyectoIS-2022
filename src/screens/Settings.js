import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
const Settings = ({navigation})=>{
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
            <Text>Settings</Text>
            <TouchableOpacity>
                <Text>Tocame</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Settings;