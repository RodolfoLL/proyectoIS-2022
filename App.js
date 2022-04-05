import { StatusBar } from 'expo-status-bar';
import { doc, setDoc } from 'firebase/firestore';
import { StyleSheet, View} from 'react-native';
import { ButtonCancel, ButtonCont, ButtonDate, ButtonFecha } from './Components/Button';
import Icon from './Components/Icons';
import {db} from './database/firebase'
export default function App() {
  const Create = ()=>{

    const myDoc = doc(db,'MyCollectionName','MyDocument');
    const docdata = {
      'name':"lopezrodo",
      'edad': "12"
    }
    setDoc(myDoc,docdata)
      .then(()=> {
        alert('document created');
      })
      .catch((error)=>{
        alert(error.mesagge)
    })
  }


  return (
    <View style={styles.container}>
      <Icon />
      <ButtonDate />
      <ButtonFecha />
      <ButtonCont/>
      <ButtonCancel/>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
