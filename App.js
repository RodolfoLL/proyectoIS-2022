import React ,{useState} from "react";
import {Text,View,StyleSheet,Button,TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
var tipo=''
const App = () => {
  const[nombre,setNombre]=useState('');

  const[checked,setcheckedOral]=useState(false);
  const[checkedIntramuscular,setcheckedIntramuscular]=useState(false);
  const[checkedInalatoria,setcheckedInalatoria]=useState(false);
  const[checkedNasal,setcheckedNasal]=useState(false);
  const[checkedTopica,setcheckedTopica]=useState(false);
  const[checkedOftalmologica,setcheckedOftalmologica]=useState(false);
  const[checkedParetal,setcheckedParetal]=useState(false);

  return (<View style={styles.container}>
  <Text style={styles.title}>Nombre del Medicamento</Text>
  <TextInput style={styles.inputS}
    value={nombre}
    onChangeText={text => setNombre(text)}
  />
  <Text style={styles.title}>Tipo de administracion</Text>
  <View style={styles.opciones}>
   <CheckBox
  title='Via Oral'
  checked={checked}
  onPress={()=>{mostrar(1)
  setcheckedOral(true)
  setcheckedIntramuscular(false)
  setcheckedInalatoria(false)
  setcheckedNasal(false)
  setcheckedTopica(false)
  setcheckedOftalmologica(false)
  setcheckedParetal(false)
  }
  }
/>
  <CheckBox
  title='Via Intramuscular'
  checked={checkedIntramuscular}
  onPress={()=>{mostrar(2)
  setcheckedIntramuscular(true)
  setcheckedOral(false)
  setcheckedInalatoria(false)
  setcheckedNasal(false)
  setcheckedTopica(false)
  }
  }
/>
 <CheckBox
  title='Via Inalatoria'
  checked={checkedInalatoria}
  onPress={()=>{mostrar(3)
  setcheckedIntramuscular(false)
  setcheckedOral(false)
  setcheckedInalatoria(true)
  setcheckedNasal(false)
  setcheckedTopica(false)
  setcheckedOftalmologica(false)
  setcheckedParetal(false)
  }
  }
/>
  <CheckBox
  title='Via Nasal'
  checked={checkedNasal}
  onPress={()=>{mostrar(4)
  setcheckedIntramuscular(false)
  setcheckedOral(false)
  setcheckedInalatoria(false)
  setcheckedNasal(true)
  setcheckedTopica(false)
  setcheckedOftalmologica(false)
  setcheckedParetal(false)
  }
  }

/>
 <CheckBox
  title='Via Topica'
   checked={checkedTopica}
  onPress={()=>{mostrar(5)
  setcheckedIntramuscular(false)
  setcheckedOral(false)
  setcheckedInalatoria(false)
  setcheckedNasal(false)
  setcheckedTopica(true)
  setcheckedOftalmologica(false)
  setcheckedParetal(false)
  }
  }
/>
  <CheckBox
  title='Via Oftalmologica'
   checked={checkedOftalmologica}
  onPress={()=>{mostrar(6)
  setcheckedIntramuscular(false)
  setcheckedOral(false)
  setcheckedInalatoria(false)
  setcheckedNasal(false)
  setcheckedTopica(false)
  setcheckedOftalmologica(true)
  setcheckedParetal(false)
  }
  }
/>
 <CheckBox
  title='Via Parental'
   checked={checkedParetal}
  onPress={()=>{mostrar(7)
  setcheckedIntramuscular(false)
  setcheckedOral(false)
  setcheckedInalatoria(false)
  setcheckedNasal(false)
  setcheckedTopica(false)
  setcheckedOftalmologica(false)
  setcheckedParetal(true)
  }
  }
/>
</View>
    <Button
    title="Continuar"
    color="#0093B7"
    onPress={()=>verificar(nombre,tipo)}
  />
  </View>
  );
};
const verificar=(text,tipo)=>{
  if(text!='' && tipo!==''){
    console.log("lleno un medicamento")
  }else{
    alert("Le faltan llenar campos")
  }
}
const mostrar=(n)=>{
  if(n==1){
    tipo="Via Oral"
    console.log(tipo);
  }
  if(n==2){
    tipo="Via Intramuscular"
    console.log(tipo);
  }
  if(n==3){
    tipo="Via Inalatoria"
    console.log(tipo);
  }
    if(n==4){
    tipo="Via Nasal"
    console.log(tipo);
  }
  if(n==5){
    tipo="Via Topica"
    console.log(tipo);
  }
  if(n==6){
    tipo="Via Oftalmogica"
    console.log(tipo);
  }
  if(n==7){
    tipo="Via Parental"
    console.log(tipo);
  }
}
const styles = StyleSheet.create({
  container:{flex:1,
             backgroundColor:'#001B48',
             padding:30,
             paddingTop:70,
            },
  title:{fontSize:30,
         color:'white'
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
    color:'white'
  },
  opciones:{
  margin:20
  }
});
export default App;