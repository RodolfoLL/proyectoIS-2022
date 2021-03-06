import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';

var tipo = '';
let regex = new RegExp("^[a-zA-ZÀ-ÿ ]+$");
let letras= new RegExp("[a-zA-Z]");
const PantallaRegistroMed = ( {navigation , props, route}) => {
  console.log("ENTRO")
  const {uid} = route.params;
  const verificar = (text, tipo) => { 
    if (text != '' && tipo !== '') {
      if (!letras.test(text)) {
        Alert.alert("Nombre del Medicamento","No añadiste el nombre del medicamento")
    }else
      
      if (regex.test(text)) {
        console.log("lleno un medicamento")
        navigation.navigate("Dosis del Medicamento",
          {
            uid: uid,
            nombreMed: text,
            tipoAdm: tipo
          })
      } else {
        Alert.alert("Nombre del Medicamento","Ingresar solo letras en el nombre")

      }
    } else {
       Alert.alert("Nombre de Medicamento","Debe llenar todos los campos")
    }
  }
  const [nombre, setNombre] = useState('');
  const [checked, setcheckedOral] = useState(false);
  const [checkedIntramuscular, setcheckedIntramuscular] = useState(false);
  const [checkedInalatoria, setcheckedInalatoria] = useState(false);
  const [checkedNasal, setcheckedNasal] = useState(false);
  const [checkedTopica, setcheckedTopica] = useState(false);
  const [checkedOftalmologica, setcheckedOftalmologica] = useState(false);
  const [checkedParetal, setcheckedParetal] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Nombre del Medicamento</Text>
        <TextInput {...props} 
                      editable 
                        maxLength={25} style={styles.inputS}
          value={nombre}
          onChangeText={text => setNombre(text)}
        />
        <Text style={styles.title}>Tipo de administracion</Text>
        <View style={styles.opciones}>
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
            }
            }
          />
        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            onPress={() => verificar(nombre, tipo)}
          >
            <Text style={styles.title}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>


  );
};

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    paddingLeft: 20,
    paddingRight: 30,
  },
  title: {
    fontSize: 20,
    paddingTop: 5,
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
    alignItems: 'center',
    backgroundColor: '#0093B7',
    marginBottom: '15%',
    borderRadius: 25,
    fontSize: 20,
    marginLeft: '25%',
    height: 35,
    width: 150,
  }
});
export default PantallaRegistroMed;