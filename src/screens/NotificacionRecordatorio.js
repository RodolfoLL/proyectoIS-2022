import * as Notifications from 'expo-notifications'


async function schedulePushNotification(trigger,contentNoti) {
    try{
        console.log(trigger)
        const id = await Notifications.scheduleNotificationAsync({
            content:contentNoti,
            trigger,
          });
        console.log("El id de la notificación es: "+id)
        return id;
    }catch (e){
        console.warn(`Couldn't have calculated next trigger date: ${e}`);
    }
    
  }

export default schedulePushNotification;