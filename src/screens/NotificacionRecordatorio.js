import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'


Notifications.setNotificationHandler( 
  {
      handleNotification: async()=>({
          shouldShowAlert:true,
          shouldPlaySound:true,
          shouldSetBadge:true
      })
  }
);

async function schedulePushNotification(trigger,contentNoti) {
  const id = await Notifications.scheduleNotificationAsync({
    content: contentNoti,
    trigger,
  });
  console.log("===============Notificacion Creada============<")
  console.log("Id de notificacion"+id)
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
export  {schedulePushNotification, registerForPushNotificationsAsync};