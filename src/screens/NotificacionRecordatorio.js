import React, { useState, useEffect } from "react";
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import {crearFechasNotificación, guardarNotificaciones,obetenerDatosRecordatorios,
        eliminarRecordatorioStorage} from '../functions/notificacionFunciones'
import { async } from "@firebase/util";
// import * as TaskManager from 'expo-task-manager';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error, executionInfo }) => {
//   console.log('----------Received a notification in the background!');
//   console.log(data)
//   console.log(error)
//   console.log(executionInfo)
//   console.log("----------------------------------")
//   alert('----------Received a notification in the background!')
//   // Do something with the notification data
//   await Notifications.scheduleNotificationAsync({
//     content: {
//      title: "Solo le queda "+cantidad+" "+nombre+" de medicamento",
//      body: "Debes comprar mas medicamentos para mañana 💊",
//     },
//     trigger: { seconds:60*5},
//   });
// });

// Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

Notifications.setNotificationHandler(
  {
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  }
);

async function schedulePushNotification(uid, recordatorioId,trigger, contentNoti) {
  Notifications.scheduleNotificationAsync({
    content: contentNoti,
    trigger,
  })
  .then(id => { 
    guardarNotificaciones(uid,recordatorioId,id)
    console.log("===============Notificacion Creada============<")
    console.log("Id de notificacion" + id)
    return id });

  
}

async function cancelScheduledNotificationAsync(notificacionId){
  Notifications.cancelScheduledNotificationAsync(notificacionId)
  .then(data => {console.log("Se cancela la notifcacion " +notificacionId+" con data: "+data)})
}

const eliminarRecordatorioNotif= async (uid,recordatorioId) => {
  let booleanVar = true
  await obetenerDatosRecordatorios(uid,recordatorioId)
  .then(async recordatorios =>{
    if(recordatorios[recordatorioId]!=null){
      let notificaciones =  recordatorios[recordatorioId]
      notificaciones.forEach(async notificacionId => {
          await cancelScheduledNotificationAsync(notificacionId);
          console.log("******Se elimino la notificacion*****");
      });
     await eliminarRecordatorioStorage(uid,recordatorioId)
     booleanVar = true;
    }else{
      booleanVar = false;
    }
  })
  return booleanVar
}

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    return new Error('No estas en un dispositivo movil');
  }
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

const creadorDeNotificaciones = async (fechaTemporal, datosRecordatorio, uid, recordatorioId,minAnticipacion) => {
  const minutosAnticipacion = minAnticipacion
  const fechasDeNotificacion =
    crearFechasNotificación(datosRecordatorio.hora, fechaTemporal, minutosAnticipacion);
  let notificacionesIds = [];
  fechasDeNotificacion.forEach(async unaFecha => {
    try {
      let fechaLimite = new Date(unaFecha.getTime()+(60*minutosAnticipacion*1000))
      console.log("Fecha Limite "+ fechaLimite) 
      console.log("Fecha Limite Real "+ unaFecha ) 
      let minuto = fechaLimite.getMinutes() < 10 ?
        "0" + (fechaLimite.getMinutes() ) :
        "" + (fechaLimite.getMinutes() )
      let hora = fechaLimite.getHours() < 10 ?
        "0" + fechaLimite.getHours() :
        "" + fechaLimite.getHours()
      let tipoAdm = datosRecordatorio.tipoAdm

      let mensaje = ""
      if (tipoAdm == "Via Oral") 
      { mensaje = "tomar 💊 tu "; }
      if (tipoAdm == "Via Intramuscular" ||
        tipoAdm == "Via Parenteral") 
        { mensaje = "aplicarte 💉 el "; }
      if (tipoAdm == "Via Inalatoria") 
      { mensaje = "inhalar 😮‍💨"; }
      if (tipoAdm == "Via Nasal") 
      { mensaje = "aplicarte 👃😤 el "; }
      if (tipoAdm == "Via Topica") 
      { mensaje = "administrarte 🧴 el "; }
      if (tipoAdm == "Via Oftalmogica") 
      { mensaje = "colocarte las gotas 💦👀 "; }

      let content = {
        title: "Debes " + mensaje + datosRecordatorio.nombreMed,
        body: datosRecordatorio.dose + " dosis a las ⏰ " + hora + ':' + minuto,
        data:{ 
          uid: uid+'',
          recordatorioId: recordatorioId+'',
          cantMedicamento:datosRecordatorio.quantity+'',
          nombreMed:datosRecordatorio.nombreMed+'',
          DosisMed:datosRecordatorio.dose+'',
          Duracion:datosRecordatorio.duracion+'',
          FrecuenciaHoras:(datosRecordatorio.hora).length+''
        }
      }
      await schedulePushNotification(uid,recordatorioId,unaFecha, content)
      // .then(id => {notificacionesIds.push(id )})
      
    } catch (e) {
      alert("Hubo un error inesperado al crear el recordatorio de medicamentos.");
      console.log(e);
    }
  });
  return notificacionesIds;
};

export { schedulePushNotification, registerForPushNotificationsAsync, creadorDeNotificaciones , cancelScheduledNotificationAsync, eliminarRecordatorioNotif};