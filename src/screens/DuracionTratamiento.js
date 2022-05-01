import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'
import {collection, addDoc} from 'firebase/firestore';
import { crearFechasNotificación } from "../functions/notificacionFunciones";
import {schedulePushNotification} from './NotificacionRecordatorio';


const creador_de_notifiaciones = (fechaTemporal, datosRecordatorio) => {
    const minutosAnticipacion = 5
    const fechasDeNotificacion =
        crearFechasNotificación(datosRecordatorio.hora, fechaTemporal, minutosAnticipacion);
    console.log(fechasDeNotificacion);
    fechasDeNotificacion.forEach(fechaLimite => {
        try {
            
            let minuto = fechaLimite.getMinutes() < 10 ?
                "0" + (fechaLimite.getMinutes() + minutosAnticipacion) :
                "" + (fechaLimite.getMinutes() + minutosAnticipacion)
            let hora = fechaLimite.getHours() < 10 ?
                "0" + fechaLimite.getHours() :
                "" + fechaLimite.getHours()
            let tipoAdm = datosRecordatorio.tipoAdm
            let mensaje = ""
            if (tipoAdm == "Via Oral") { mensaje = "tomar 💊 tu "; }
            if (tipoAdm == "Via Intramuscular" ||
                tipoAdm == "Via Parenteral") { mensaje = "aplicarte 💉 el "; }
            if (tipoAdm == "Via Inalatoria") { mensaje = "inhalar 😮‍💨"; }
            if (tipoAdm == "Via Nasal") { mensaje = "aplicarte 👃😤 el "; }
            if (tipoAdm == "Via Topica") { mensaje = "administrarte 🧴 el "; }
            if (tipoAdm == "Via Oftalmogica") { mensaje = "colocarte las gotas 💦👀 "; }
            let content = {
                title: "Debes "+mensaje+ datosRecordatorio.nombreMed,
                body: datosRecordatorio.dose + " dosis a las ⏰ " + hora + ':' + minuto
            }
            const id =
                schedulePushNotification(fechaLimite, content)
        } catch (e) {
            alert("Hubo un error inesperado al crear el recordatorio de medicamentos.");
            console.log(e);
        }
    });

};


const DuracionTratamiento = (props) => {

    const { uid,nombreMed,tipoAdm,dose,quantity,item,hora,editar } = props.route.params;
    
    const guardarDuracion = (nDias)=>{
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
            addDoc(collection(db, uid), datosRecordatorio)
        }
        creador_de_notifiaciones(fechaTemporal, datosRecordatorio);
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