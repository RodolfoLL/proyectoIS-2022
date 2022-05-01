import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'
import {collection, addDoc} from 'firebase/firestore';
import {creadorDeNotificaciones} from './NotificacionRecordatorio';
import { guardarNotificaciones } from "../functions/notificacionFunciones";


const DuracionTratamiento = (props) => {

    const { uid,nombreMed,tipoAdm,dose,quantity,item,hora,editar } = props.route.params;
    
    const guardarDuracion = async (nDias)=>{
        let fechaActual = new Date()
        let fechaTemporal = new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate()+nDias)
        let duracion = fechaTemporal.getDate() +'/'+ (fechaTemporal.getMonth()+1)+'/'+ fechaTemporal.getFullYear() 
        let datosRecordatorio = {}
        if (editar){
            
            datosRecordatorio = {
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion
            } 
            const id = props.route.params.id
            guardarEdit(id,datosRecordatorio)
        }
        else{
            datosRecordatorio = {
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion
            }
            let docDb = await addDoc(collection(db, uid), datosRecordatorio)
                        .then(async function(docRef) {
                            let idRecordatorio = docRef.id+""
                            console.log("Document written with ID: ", docRef.id);
                            // let datosUsuario = AsyncStorage.getItem(uid)
                            // console.log(datosUsuario);
                            // let recordatorios = datosUsuario!==null?JSON.parse(datosUsuario):{};
                            // console.log(JSON.stringify(recordatorios))
                            creadorDeNotificaciones(fechaTemporal, datosRecordatorio)
                            .then(notifId => guardarNotificaciones(uid,idRecordatorio,notifId))
                            // console.log(idNotificaciones)
                            // recordatorios[idRecordatorio]= idNotificaciones;//[i1,id2,id3]
                            try {
                                // const jsonValue = JSON.stringify(recordatorios);
                                // await AsyncStorage.setItem(uid, jsonValue);
                                console.log("Agragado al local storage")
                                // console.log(JSON.stringify(AsyncStorage.getItem(uid)))
                            } catch (e) {
                                console.log("============ERROR Storage==========")
                                console.log(e)
                                // saving error
                                }
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
            // console.log(docDb)
            console.log("/////////////////////////////////////////////")
        }
        
        props.navigation.navigate("Recordatorios",{uid});
    }

    const guardarEdit = async (id,datos) =>{
        
        const docref = doc(db,uid,id)
        console.log(docref)
        console.log(datos);
        await setDoc(docref,datos)
    }

    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={styles.title}>¿Cuanto dura el tratamiento?</Text>
            </View>

            <View style={[styles.box, styles.box2]}>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(5)} >
                    <Text style={styles.textBoton}>5 dias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(10)}  >
                    <Text style={styles.textBoton}>10 dias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(7)}  >
                    <Text style={styles.textBoton}>1 semana</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(30)}  >
                    <Text style={styles.textBoton}>30 dias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => {props.navigation.navigate('FechaFinal', props.route.params)}}  >
                    <Text style={styles.textBoton}>Establecer la fecha final</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#001B48',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    box1: {
        flex: 1,
        paddingTop: 50,
    },
    box2: {
        flex: 6
    },
    title:{
        fontSize: 25,
        color: '#fff'
    },
    boton:{
        backgroundColor: "#0093B7",
        borderRadius:25,
        marginBottom: 20,
        padding: 10,
		alignItems: 'center'
    },
    textBoton:{
        fontSize: 20,
        color: "#fff"
    }
});

export default DuracionTratamiento