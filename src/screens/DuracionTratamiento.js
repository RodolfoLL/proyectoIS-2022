import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'
import {collection, addDoc} from 'firebase/firestore';
import * as Notifications from 'expo-notifications'
import { async } from '@firebase/util';

const parseHorasMinutos = (arregloHoras) =>{
    let resultadoHoras =[]
    let horaParse = 0;
    let minutoParse = 0;
    let sistHorario = "";
    console.log(arregloHoras)
    arregloHoras.forEach(horaMinuto =>{
        if(horaMinuto.length==7){
            horaParse = Number(horaMinuto[0])
            minutoParse = Number(horaMinuto[2]+horaMinuto[3])
            sistHorario = horaMinuto[5]+horaMinuto[6]
        }else{
            horaParse = Number(horaMinuto[0]+horaMinuto[1])
            minutoParse = Number(horaMinuto[3]+horaMinuto[4])
            sistHorario = horaMinuto[6]+horaMinuto[7]
        }
        horaParse = sistHorario=="PM" && horaParse!=12? horaParse+12: horaParse;
        resultadoHoras.push({hora:horaParse, minuto:minutoParse-5});//agrego la hora restando 5 minutos a la hora de notificar
    });
    return resultadoHoras
}

const crearFechasNotificación = (horasMinutos,fechaTermino)=>{
    var fechasNotificacion = []
    const horas = parseHorasMinutos(horasMinutos)// arreglo de horas en formato de 24hrs
    console.log(horas)
    // fechaTermino.setMonth(fechaTermino.getMonth()-1);
    horas.forEach(objHora => {
        let fechaContenedora = new Date(Date.now());//iniciara como la fecha actual
        console.log(objHora)
        fechaContenedora.setHours(objHora.hora,objHora.minuto,0);
        // fechaContenedora.setMonth(fechaContenedora.getMonth()-1);// esto lo hago por que por alguna razon la notificacion se crea un mes despues del indicado, asi que lo resto aca ese mes y asi se desplegará en la fecha correcta deseada
        fechaTermino.setHours(objHora.hora,objHora.minuto)

        console.log(fechaContenedora.getTime())
        while(fechaContenedora.getTime() <= fechaTermino.getTime()){
            fechasNotificacion.push(new Date(fechaContenedora));
            fechaContenedora.setTime(fechaContenedora.getTime() + 60 * 60 * 24 *1000)
        }
    });
    return fechasNotificacion;
};

const creador_de_notifiaciones = async(fechaTemporal, datosRecordatorio)=>{
    const fechasDeNotificacion = crearFechasNotificación(datosRecordatorio.hora,fechaTemporal)
    console.log(fechasDeNotificacion)
    fechasDeNotificacion.forEach(fechaLimite => {
        new Date().getMinutes
        try{
            const id = schedulePushNotification(fechaLimite,datosRecordatorio)
            console.log("Se creó la notificación")
        }catch (e) {
            alert("Hubo un error inesperado al crear la notificación");
            console.log(e);
        }
    });

};
async function schedulePushNotification(trigger,datosRecordatorio) {
    console.log(trigger)
    let minuto = trigger.getMinutes()<10?"0"+trigger.getMinutes()+5:""+trigger.getMinutes()+5
    let hora = trigger.getHours()<10?"0"+trigger.getHours():""+trigger.getHours()
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: "Es hora de tomar tu "+datosRecordatorio.nombreMed+" ⏰",
        body: 'Debes tomar '+datosRecordatorio.dose+' dosis a las '+ hora+':'+minuto
      },
      trigger,
    });
  }
async function logNextTriggerDate() {
    try {
        const a =await Notifications.cancelScheduledNotificationAsync("f7435bd2-b188-4e36-827a-9f95355fc270");
        console.log(a)
    } catch (e) {
      console.warn(`Couldn't have calculated next trigger date: ${e}`);
    }
  }

const DuracionTratamiento = (props) => {

    const { nombreMed,tipoAdm,dose,quantity,item,hora,editar } = props.route.params;
    
    const guardarDuracion = async (nDias)=>{
        let fechaContenedora = new Date()
        let fechaTemporal = new Date(fechaContenedora.getFullYear(),fechaContenedora.getMonth(),fechaContenedora.getDate()+nDias)
        let duracion = fechaTemporal.getDate() +'/'+ (fechaTemporal.getMonth()+1)+'/'+ fechaTemporal.getFullYear() 

        if (editar){
            
            let datosRecordatorio = {
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
            let datosRecordatorio = {
                nombreMed: nombreMed, 
                tipoAdm: tipoAdm,
                dose: dose,
                quantity:quantity,
                item: item,
                hora:hora,
                duracion: duracion
            }
            await creador_de_notifiaciones(fechaTemporal, datosRecordatorio)
            addDoc(collection(db, 'Recordatorios'), datosRecordatorio)
        }
        
        props.navigation.navigate("Recordatorios");
    }

    const guardarEdit = async (id,datos) =>{
        
        const docref = doc(db,"Recordatorios",id)
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
                <TouchableOpacity style={styles.boton}
                    onPress={async () => await logNextTriggerDate()}  >
                    <Text style={styles.textBoton}>Get notif trigger</Text>
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