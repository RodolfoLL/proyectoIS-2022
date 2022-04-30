import * as Notifications from 'expo-notifications'


async function schedulePushNotification(trigger,contentNoti) {
  return await Notifications.scheduleNotificationAsync({
    content: contentNoti,
    trigger,
  });
}
export default schedulePushNotification;