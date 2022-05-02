
import React, { useState } from "react"
import { StyleSheet , ScrollView, View,Text, TextInput, TouchableOpacity} from "react-native";
import {db} from '../../database/firebase'
import {collection, addDoc} from 'firebase/firestore';
import {creadorDeNotificaciones} from './NotificacionRecordatorio';
import { guardarNotificaciones } from "../functions/notificacionFunciones";

let expRegSoloNumeros =  new RegExp("^[0-9]*$")

const ConfiguraciónNotificación = (props) => {
    let minAnticipación = "5";
    const [anticipación, setMinAnticipacion] = useState(minAnticipación);
    const { uid,nombreMed,tipoAdm,dose,quantity,item,hora,duracion,editar } = props.route.params;

    const guardarRecordatorio = () => {
        let datosRecordatorio = {}
        datosRecordatorio = {
            nombreMed: nombreMed, 
            tipoAdm: tipoAdm,
            dose: dose,
            quantity:quantity,
            item: item,
            hora:hora,
            duracion: duracion
        }
        addDoc(collection(db, uid), datosRecordatorio)
            .then(async function(docRef) {
                let idRecordatorio = docRef.id+""
                minAnticipación= anticipación == ""?"0":anticipación;
                console.log("Document written with ID: ", docRef.id);
                await creadorDeNotificaciones(new Date(duracion), datosRecordatorio,uid,idRecordatorio, parseInt(minAnticipación))
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        // console.log(docDb)
        console.log("/////////////////////////////////////////////")
        props.navigation.navigate("Recordatorios",{uid});
    };

    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.container}>
                <View style={STYLE_GROUP.containerItem}>
                    <View style={STYLE_GROUP.text}>
                        <Text style={STYLE_GROUP.text}>{'¿Cuantos minutos antes desea que se le notifique tomar su medicamento?'}</Text>
                    </View>
                    {/* <View style={STYLE_GROUP.viewPicker}> */}
                    <TextInput
                        editable 
                        maxLength={2} 
                        style={STYLE_GROUP.inputS}
                        value={anticipación}
                        onChangeText={text => expRegSoloNumeros.test(text)?setMinAnticipacion(text):null}
                        keyboardType={'numeric'}
                        placeholder='0'
                        placeholderTextColor="#789198" 
                    />
                    {/* </View> */}
                </View>
                <View style={STYLE_GROUP.containerItem}>
                    <TouchableOpacity
                        onPress={()=>guardarRecordatorio()}
                    >
                        <View style={STYLE_GROUP.button}>
                            <Text style={STYLE_GROUP.texto}>Guardar Recordatorio</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        </ScrollView>
    );
};

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
            width:150,
            height:55,
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
export default ConfiguraciónNotificación