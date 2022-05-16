import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert,Image } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import {collection, addDoc,doc,setDoc} from 'firebase/firestore';

const DatosUsuario = ( {navigation , props, route}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
      <Image
          style={styles.incono}
          source={require("../assets/captura.jpg")}
        />
        <View style={styles.contenido}>
        <Text style={styles.title}>Nombre de Usuario</Text>
        <Text style={styles.title}>Usuario</Text>
        <Text style={styles.title}>Correo Electronico</Text>
        <Text style={styles.title}>Usuario@gmail.com</Text>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            onPress={() => console.log("Actualizar Cuenta")}
          >
            <Text style={styles.title}>Actualizar Cuenta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            onPress={() => console.log("Eliminar Cuenta")}
          >
            <Text style={styles.title}>Eliminar Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
    color: 'white',
    textAlign: "center"

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
  contenido:{
    margin:50
  },
  botones: {
    alignItems: 'center',
    backgroundColor: '#0093B7',
    marginBottom: '10%',
    borderRadius: 25,
    fontSize: 20,
    marginLeft: '25%',
    height: 40,
    width: 150,
  },
    incono:{
    resizeMode: 'contain',
    width: "80%",
    alignSelf:"center",
    maxHeight: "10%",
    paddingBottom:40
    }
});
export default DatosUsuario;