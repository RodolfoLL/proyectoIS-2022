import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, ScrollView,Alert } from 'react-native';
import { CheckBox, Switch } from 'react-native-elements';


var editado = false;
var tipo = '';
let regex = new RegExp("^[a-zA-ZÀ-ÿ ]+$");
let letras= new RegExp("[a-zA-Z]");
const RegistroEdit =({route,navigation}) => {
    
    const parametros  = route.params
    
    
    const verificar = (text, tipo) => {
      if (!editado){
        tipo = parametros.tipoAdm
      }
      if (text != '' && tipo !== '') {
        if (!letras.test(text)) {
          Alert.alert("Nombre del Medicamento","No añadiste el nombre del medicamento")
      }else
        if(text.length>30){
          Alert.alert("Nombre del Medicamento","El nombre del medicamento excede el tamaño de texto permitido")
        }else
        if (regex.test(text)) {
          console.log("lleno un medicamento")
          navigation.navigate("Editar Dosis",
            {
              uid: parametros.uid,
              id: parametros.id,
              nombreMed: text,
              tipoAdm: tipo,
              dose: parametros.dose,
              quantity: parametros.quantity,
              item: parametros.item,
              hora: parametros.hora,
              duracion: parametros.duracion,
              editar:true

            })
        } else {
          Alert.alert("Nombre del Medicamento","Ingresar solo letras en el nombre")
  
        }
      } else {
         Alert.alert("Nombre de Medicamento","Debe llenar todos los campos")
      }
    }
    
    const [nombre, setNombre] = useState(parametros.nombreMed);
    
    if(parametros.tipoAdm == "Via Oral"){
        var [checked, setcheckedOral] = useState(true);
         }
    else{
        var [checked, setcheckedOral] = useState(false);
    }   
    if(parametros.tipoAdm =="Via Intramuscular"){
        var [checkedIntramuscular, setcheckedIntramuscular] = useState(true);}
    else{
        var [checkedIntramuscular, setcheckedIntramuscular] = useState(false);
    }
    if(parametros.tipoAdm =="Via Inalatoria"){
        var [checkedInalatoria, setcheckedInalatoria] = useState(true);
    }
    else{
        var [checkedInalatoria, setcheckedInalatoria] = useState(false);
    }
    if(parametros.tipoAdm =="Via Nasal"){
        var  [checkedNasal, setcheckedNasal] = useState(true);
    }
    else{
        var  [checkedNasal, setcheckedNasal] = useState(false);
    }
    if(parametros.tipoAdm =="Via Topica"){
        var [checkedTopica, setcheckedTopica] = useState(true);
    }
    else{
        var [checkedTopica, setcheckedTopica] = useState(false);
    }
    if(parametros.tipoAdm =="Via Oftalmogica"){
        var [checkedOftalmologica, setcheckedOftalmologica] = useState(true);
    }
    else{
        var [checkedOftalmologica, setcheckedOftalmologica] = useState(false);
    }
    if(parametros.tipoAdm =="Via Parenteral"){
      
       var [checkedParetal, setcheckedParetal] = useState(true);
    }
    else{
        var [checkedParetal, setcheckedParetal] = useState(false);
    }
    
    const mostrar = (n) => {
      if (n == 1) {
        tipo = "Via Oral"
        console.log(tipo);
      }
      if (n == 2) {
        tipo = "Via Intramuscular"
        console.log(tipo);
      }
      if (n == 3) {
        tipo = "Via Inalatoria"
        console.log(tipo);
      }
      if (n == 4) {
        tipo = "Via Nasal"
        console.log(tipo);
      }
      if (n == 5) {
        tipo = "Via Topica"
        console.log(tipo);
      }
      if (n == 6) {
        tipo = "Via Oftalmogica"
        console.log(tipo);
      }
      if (n == 7) {
        tipo = "Via Parenteral"
        console.log(tipo);
      }
    }
    const setEditado = () =>{
      editado = true;
      console.log(editado)
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#001B48',
        paddingLeft: 20,
        paddingRight: 30,
      },
      title: {
        fontSize: 20,
        paddingTop: 10,
        color: 'white'
      },
      inputS: {
        height: 40,
        width: "100%",
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        color: 'white'
      },
      opciones: {
        margin: 20,
      },
      botones: {
        padding: 7,
        fontSize: 20
      }
    });
  
    
  
   
    return (
      <ScrollView style={styles.container}>
         
        <View style={styles.container}>
          <Text style={styles.title}>Nombre del  Medicamento</Text>
          <TextInput style={styles.inputS}
            value={nombre}
            onChangeText={text => setNombre(text)}
          />
          <Text style={styles.title}>Tipo de administracion</Text>
          <View style={styles.opciones}>
            {}
            <CheckBox
              title='Via Oral'
              checked={checked}
              onPress={() => {
                mostrar(1)
                setcheckedOral(true)
                setcheckedIntramuscular(false)
                setcheckedInalatoria(false)
                setcheckedNasal(false)
                setcheckedTopica(false)
                setcheckedOftalmologica(false)
                setcheckedParetal(false)
                setEditado();
                

              }
              }
            />
            <CheckBox
              title='Via Intramuscular'
              checked={checkedIntramuscular}
              onPress={() => {
                mostrar(2)
                setcheckedIntramuscular(true)
                setcheckedOral(false)
                setcheckedInalatoria(false)
                setcheckedNasal(false)
                setcheckedTopica(false)
                setEditado();
              }
              }
            />
            <CheckBox
              title='Via Inalatoria'
              checked={checkedInalatoria}
              onPress={() => {
                mostrar(3)
                setcheckedIntramuscular(false)
                setcheckedOral(false)
                setcheckedInalatoria(true)
                setcheckedNasal(false)
                setcheckedTopica(false)
                setcheckedOftalmologica(false)
                setcheckedParetal(false)
                setEditado();
              }
              }
            />
            <CheckBox
              title='Via Nasal'
              checked={checkedNasal}
              onPress={() => {
                mostrar(4)
                setcheckedIntramuscular(false)
                setcheckedOral(false)
                setcheckedInalatoria(false)
                setcheckedNasal(true)
                setcheckedTopica(false)
                setcheckedOftalmologica(false)
                setcheckedParetal(false)
                setEditado();
              }
              }
  
            />
            <CheckBox
              title='Via Topica'
              checked={checkedTopica}
              onPress={() => {
                mostrar(5)
                setcheckedIntramuscular(false)
                setcheckedOral(false)
                setcheckedInalatoria(false)
                setcheckedNasal(false)
                setcheckedTopica(true)
                setcheckedOftalmologica(false)
                setcheckedParetal(false)
                setEditado();
              }
              }
            />
            <CheckBox
              title='Via Oftalmologica'
              checked={checkedOftalmologica}
              onPress={() => {
                mostrar(6)
                setcheckedIntramuscular(false)
                setcheckedOral(false)
                setcheckedInalatoria(false)
                setcheckedNasal(false)
                setcheckedTopica(false)
                setcheckedOftalmologica(true)
                setcheckedParetal(false)
                setEditado();
              }
              }
            />
            <CheckBox
              title='Via Parenteral'
              checked={checkedParetal}
              onPress={() => {
                mostrar(7)
                setcheckedIntramuscular(false)
                setcheckedOral(false)
                setcheckedInalatoria(false)
                setcheckedNasal(false)
                setcheckedTopica(false)
                setcheckedOftalmologica(false)
                setcheckedParetal(true)
                setEditado();
              }
              }
            />
          </View>
          <View style={styles.botones}>
            <Button
              title="Continuar"
              color="#0093B7"
              onPress={() => verificar(nombre, tipo)}
            />
          </View>
        </View>
      </ScrollView>
  
  
    );
  };
  
 
export default RegistroEdit;