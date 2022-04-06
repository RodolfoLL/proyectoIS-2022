import React from "react";
import {Text,View,StyleSheet,Button,TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements';
const App = () => {
  return (<View style={styles.container}>
  <Text style={styles.title}>Nombre del Medicamento</Text>
  <TextInput style={styles.inputS}
    placeholder="nombreMed"
  />
  <Text style={styles.title}>Tipo de administracion</Text>
  <View style={styles.opciones}>
   <CheckBox
  title='Via Oral'
/>
  <CheckBox
  title='Via Intramuscular'
/>
 <CheckBox
  title='Via Inalatoria'
/>
  <CheckBox
  title='Via Nasal'
/>
 <CheckBox
  title='Via Topica'
/>
  <CheckBox
  title='Via Oftalmologica'
/>
 <CheckBox
  title='Via parental'
/>
</View>
    <Button
    title="Continuar"
    color="#0093B7"
    onPress={()=>console.log('continuar')}
  />
  </View>
  );
};
const styles = StyleSheet.create({
  container:{flex:1,
             backgroundColor:'#001B48',
             padding:30,
             paddingTop:70,
            },
  title:{fontSize:30,
         color:'white'
         },
  imagen:{
    height:200,
    width:200,
    borderRadius:100
  },
  inputS:{
    height:40,
    width:350,
    borderColor:'white',
    borderWidth:3,
    borderRadius:5,
    marginTop:30,
    marginBottom:30,
    padding:15,
  },
  subtitle:{
  color:'white',
  margin:10,
  fontSize:25
  },
  opciones:{
  margin:20
  }
});
export default App;