import React, { useState } from "react"
import { StyleSheet , ScrollView, View,Text, TextInput, TouchableOpacity} from "react-native";
import {db} from '../../database/firebase'
import {collection, addDoc,doc,setDoc} from 'firebase/firestore';

const RecuperarContrasenia = ({navigation}) => {
    const [correo, setCorreo] = useState('');
    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.container}>
                <View style={STYLE_GROUP.containerItem}>
                    <View style={STYLE_GROUP.text}>
                        <Text style={STYLE_GROUP.text}>{'Ingrese su correo electronico'}</Text>
                    </View>
                    {/* <View style={STYLE_GROUP.viewPicker}> */}
                    <TextInput
                        editable 
                        maxLength={2} 
                        style={STYLE_GROUP.inputS}
                        value={correo}
                        onChangeText={text => expRegSoloNumeros.test(text)?setCorreo(text):null}
                        keyboardType={'numeric'}
                        placeholder='email@address.com'
                        placeholderTextColor="#789198" 
                    />
                    {/* </View> */}
                </View>
                <View style={STYLE_GROUP.containerItem}>
                    <TouchableOpacity
                        onPress={()=>guardarRecordatorio()}
                    >
                        <View style={STYLE_GROUP.button}>
                            <Text style={STYLE_GROUP.texto}>Obtener codigos de acceso</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        </ScrollView>
    );
}
const STYLE_GROUP = StyleSheet.create(
    {
        containerMain:
        {
            flex: 1,
            backgroundColor: "#001B48",
            width: "100%"
        },
        containerEncabezado: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        container:
        {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: "30%",
            paddingBottom: "30%",
            color: "#FFFFFF",
        },
        containerItem: {
            flex: 1,
            marginVertical: 20,
        },
        text:
        {
            flex: 1,
            color: "#FFFFFF",
            fontSize: 25,
            marginBottom: 10
        },
        button:{
            alignSelf:'center',
            backgroundColor:'#0093B7',
            borderRadius:25,
            width:270,
            height:55,
            paddingVertical: "3%"
        },
        texto:{
            color:'white',
            fontFamily:'sans-serif',
            fontSize:20,
            textAlign:'center'  
        },
        inputS: {
            height: 50,
            width: "100%",
            borderColor: 'white',
            borderWidth: 3,
            borderRadius: 5,
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            color: 'white',
            fontSize: 24,
          }

    }
);
export default RecuperarContrasenia ;