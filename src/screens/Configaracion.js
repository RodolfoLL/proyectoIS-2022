import React from 'react';
import { View, TextInput, StyleSheet, Button,TouchableOpacity, Image,Text, Alert} from 'react-native';
import { getAuth,signOut} from 'firebase/auth';
import { Feather } from '@expo/vector-icons';
import {app} from '../../database/firebase'


const Configuracion =({navigation})=>{
    const auth = getAuth(app);
    
    const signOutUser = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Login');
        } catch (e) {
            console.log(e);
        }
    }
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
        <View style = {style.container}>
            <TouchableOpacity
              onPress={() => signOutUser()}
            >
            <View style={style.button}>
              <Text style={style.texto}>Cerrar Sesion</Text>
            </View>
            </TouchableOpacity>
        </View>
    );
}
const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#001B48'
    },
    texto:{
        color:'white',
        fontFamily:'sans-serif',
        fontSize:20,
        textAlign:'center'  
    },
      button:{
        backgroundColor:'#0093B7',
        borderRadius:25,
        width:200,
        height:32,
        marginVertical:20,
        padding:2
    },

});
export default Configuracion