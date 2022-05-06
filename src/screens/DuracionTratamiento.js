import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'


const DuracionTratamiento = (props) => {

    const { uid,nombreMed,tipoAdm,dose,quantity,item,hora,editar } = props.route.params;
    
    const guardarDuracion = async (nDias)=>{
        let fechaActual = new Date()
        let fechaTemporal = new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate()+nDias)
        let duracion = (fechaTemporal.getMonth()+1) + '/'+fechaTemporal.getDate() + '/'+ fechaTemporal.getFullYear() 
        let datosRecordatorio = {}
        if (editar){
            console.log("Entra a editar la duración del tratamiento")
            const id = props.route.params.id
            datosRecordatorio = {
                uid:uid,
                id:id,
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion,
                editar:editar
            }

            
            // guardarEdit(id,datosRecordatorio)
        }
        else{
            datosRecordatorio = {
                uid:uid,
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion,
                editar:editar
            }
        }
        props.navigation.navigate("Configurar Notificacion",datosRecordatorio);
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