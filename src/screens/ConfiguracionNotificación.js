import React, { useState, useEffect } from "react";
import { StyleSheet , ScrollView, View,Text, TextInput, TouchableOpacity, ActivityIndicator} from "react-native";
import {db} from '../../database/firebase'
import {collection, addDoc,doc,setDoc} from 'firebase/firestore';
import {creadorDeNotificaciones, eliminarRecordatorioNotif} from './NotificacionRecordatorio';
import {guardarNotificaciones} from '../functions/notificacionFunciones'
import {Overlay} from 'react-native-elements'
let expRegSoloNumeros =  new RegExp("^[0-9]*$")

const ConfiguraciónNotificación = (props) => {
    const [fuente,setFuente] = useState({fontSize: 20})
    const [fuenteTitulo,setFuenteTitulo] = useState({fontSize: 30})

    let minAnticipación = "5";
    const [anticipación, setMinAnticipacion] = useState(minAnticipación);
    const { uid,nombreMed,tipoAdm,dose,quantity,item,hora,duracion,editar,fuenteNuevo } = props.route.params;
    const [loading,setLoading] = useState(false)

    function Loading({ isVisible, text }) {
        return (
            <Overlay
                isVisible={isVisible}
                windowBackgoundColor="rgba(0,0,0,0.5)"
                overlayBackgroundColor="transparent"
                overlayStyle={STYLE_GROUP.overlay}
            >
                <View style={STYLE_GROUP.view}>
                    <ActivityIndicator
                        size="large"
                        color="#442484"
                    />
                    {
                        text && <Text style={STYLE_GROUP.text2}>{text}</Text>
                    }
                </View>
            </Overlay>
        )
    }

    useEffect( () =>{
        let fuenteTemporalTitulo = {
            fontSize: fuenteNuevo.fontSize+5
        }
        setFuente(fuenteNuevo)
        setFuenteTitulo(fuenteTemporalTitulo)
      },[]
    );

    const guardarRecordatorio = async() => {
        setLoading(true);
        let datosRecordatorio = {};
        datosRecordatorio = {
            nombreMed: nombreMed, 
            tipoAdm: tipoAdm,
            dose: dose,
            quantity:quantity,
            item: item,
            hora:hora,
            duracion: duracion
        }
        minAnticipación= anticipación == ""?"0":anticipación;
        console.log("Minutos de anticipacion " + minAnticipación)
        if(editar){
            const id = props.route.params.id
            datosRecordatorio = {
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion
            }
            const docref = doc(db,uid,id)
            //console.log(datos);
            await eliminarRecordatorioNotif(uid, id)
            .then(async data=>{
                await setDoc(docref,datosRecordatorio)
                .then(async function(docRef) {
                    let list_notificaiones = [""]
                    list_notificaiones = await creadorDeNotificaciones(new Date(duracion), datosRecordatorio,uid,id, parseInt(minAnticipación))
                    console.log("*******************************************")
                    console.log(list_notificaiones)
                    await guardarNotificaciones(uid,id,list_notificaiones)
                    setLoading(false)
                    props.navigation.navigate("Recordatorios",{uid});
                });
            });
        }else{
            console.log("DB: "+db+" UID: "+uid)
            addDoc(collection(db, uid), datosRecordatorio)
            .then(async function(docRef) {
                let idRecordatorio = docRef.id+""
                let list_notificaiones = [""]
                list_notificaiones = await creadorDeNotificaciones(new Date(duracion), datosRecordatorio,uid,idRecordatorio, parseInt(minAnticipación))
                console.log("*******************************************")
                console.log(list_notificaiones)
                await guardarNotificaciones(uid,idRecordatorio,list_notificaiones)
                setLoading(false)
                props.navigation.navigate("Recordatorios",{uid});
            })
            .catch(function(error) {
                setLoading(false)
                console.error("Error adding document: ", error);
            });
        }
        
        
    };

    return (
        <ScrollView style={STYLE_GROUP.containerMain} >
            <View style={STYLE_GROUP.container}>
                <View style={STYLE_GROUP.containerItem}>
                    <View style={[STYLE_GROUP.text,fuenteTitulo]}>
                        <Text style={[STYLE_GROUP.text,fuenteTitulo]}>{'¿Cuantos minutos antes desea que se le notifique tomar su medicamento?'}</Text>
                    </View>
                    {/* <View style={STYLE_GROUP.viewPicker}> */}
                    <TextInput
                        editable 
                        maxLength={2} 
                        style={[STYLE_GROUP.inputS,fuenteTitulo]}
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
                            <Text style={[STYLE_GROUP.texto,fuente]}>Guardar Recordatorio</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Loading isVisible={loading} text ="Creando recordatorio ..."/>
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
            //fontSize: 25,
            marginBottom: 10
        },
        button:{
            alignSelf:'center',
            backgroundColor:'#0093B7',
            borderRadius:25,
            width:"60%",
        },
        texto:{
            color:'white',
            fontFamily:'sans-serif',
            //fontSize:20,
            textAlign:'center'  
        },
        inputS: {
            width: "100%",
            borderColor: 'white',
            borderWidth: 3,
            borderRadius: 5,
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 10,
            paddingVertical: 2,
            color: 'white',
            //fontSize: 24,
        },
        overlay : {
            height: 100,
            width: 200,
            backgroundColor: "#fff",
            borderColor: "#442484",
            borderWidth: 2,
            borderRadius: 10
          },
          view: {
              flex: 1,
              alignItems: "center",
              justifyContent: "center" 
          },
          text2:{
             color: "black",
             fontSize:20,}

    }
);
export default ConfiguraciónNotificación;