import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import {crearFechasNotificación} from '../functions/notificacionFunciones'


Notifications.setNotificationHandler(
  {
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  }
);

async function schedulePushNotification(trigger, contentNoti) {
  const id = await Notifications.scheduleNotificationAsync({
    content: contentNoti,
    trigger,
  });
  console.log("===============Notificacion Creada============<")
  console.log("Id de notificacion" + id)
  return id
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

const creadorDeNotificaciones = async (fechaTemporal, datosRecordatorio) => {
  const minutosAnticipacion = 5
  const fechasDeNotificacion =
    crearFechasNotificación(datosRecordatorio.hora, fechaTemporal, minutosAnticipacion);
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

export { schedulePushNotification, registerForPushNotificationsAsync, creadorDeNotificaciones };