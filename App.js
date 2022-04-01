import { StatusBar } from 'expo-status-bar';
import { doc, setDoc } from 'firebase/firestore';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import {db} from './database/firebase'
export default function App() {

  const Create = ()=>{

    const myDoc = doc(db,'MyCollectionName','MyDocument');
    const docdata = {
      'name':"lopez",
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
      <Button title = 'create New' onPress={Create}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
