import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../database/firebase'
import { collection, addDoc } from 'firebase/firestore';
import { crearFechasNotificación } from "../functions/notificacionFunciones";
import {schedulePushNotification} from './NotificacionRecordatorio';


const creador_de_notifiaciones = (fechaTemporal, datosRecordatorio) => {
    const fechasDeNotificacion =
        crearFechasNotificación(datosRecordatorio.hora, fechaTemporal)
    fechasDeNotificacion.forEach(fechaLimite => {
        try {
            let minuto = fechaLimite.getMinutes() < 10 ?
                "0" + fechaLimite.getMinutes() :
                "" + fechaLimite.getMinutes()
            let hora = fechaLimite.getHours() < 10 ?
                "0" + fechaLimite.getHours() :
                "" + fechaLimite.getHours()
            let content = {
                title: "Es hora de tomar tu " + datosRecordatorio.nombreMed + " ⏰",
                body: 'Debes tomar ' + datosRecordatorio.dose + ' dosis a las ' + hora + ':' + minuto
            }
            const id =
                schedulePushNotification(fechaLimite, content)
            console.log(id)
        } catch (e) {
            alert("Hubo un error inesperado al crear el recordatorio de medicamentos.");
            console.log(e);
        }
    });

};


const DuracionTratamiento = (props) => {

    const { nombreMed, tipoAdm, dose, quantity, item, hora, editar } = props.route.params;

    const guardarDuracion = async (nDias) => {
        let fechaContenedora = new Date()
        let fechaTemporal = new Date(fechaContenedora.getFullYear(), fechaContenedora.getMonth(), fechaContenedora.getDate() + nDias)
        let duracion = fechaTemporal.getDate() + '/' + (fechaTemporal.getMonth() + 1) + '/' + fechaTemporal.getFullYear()

        if (editar) {

            let datosRecordatorio = {
                nombreMed: nombreMed,
                tipoAdm: tipoAdm,
                dose: dose,
                quantity: quantity,
                item: item,
                hora: hora,
                duracion: duracion
            }
            const id = props.route.params.id
            guardarEdit(id, datosRecordatorio)
        }
        else {
            let datosRecordatorio = {
                nombreMed: nombreMed,
                tipoAdm: tipoAdm,
                dose: dose,
                quantity: quantity,
                item: item,
                hora: hora,
                duracion: duracion
            }
            await creador_de_notifiaciones(fechaTemporal, datosRecordatorio)
            addDoc(collection(db, 'Recordatorios'), datosRecordatorio)
        }

        props.navigation.navigate("Recordatorios");
    }

    const guardarEdit = async (id, datos) => {

        const docref = doc(db, "Recordatorios", id)
        console.log(docref)
        console.log(datos);
        await setDoc(docref, datos)
    }

    return (
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
                    onPress={() => { props.navigation.navigate('FechaFinal', props.route.params) }}  >
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
    title: {
        fontSize: 25,
        color: '#fff'
    },
    boton: {
        backgroundColor: "#0093B7",
        borderRadius: 25,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center'
    },
    textBoton: {
        fontSize: 20,
        color: "#fff"
    }
});

export default DuracionTratamiento