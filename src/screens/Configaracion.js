import React from 'react';
import { View, TextInput, StyleSheet, Button,TouchableOpacity, Image,Text, Alert} from 'react-native';

const Configuracion =({navigation})=>{
    return(
        <View style = {style.container}>
            <Button
            title="Cerrar Sesion"
            onPress={navigation.navigate('Login')}
            />
        </View>
    );
}
const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#001B48'
    }
});
export default Configuracion