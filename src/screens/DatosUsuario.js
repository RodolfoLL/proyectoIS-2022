import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert,Image } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

const DatosUsuario = ( {navigation , props, route}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
      <Image
          style={styles.incono}
          source={require("../assets/usuario.png")}
        />
        <View>
        <Text style={styles.title}>Nombre de Usuario</Text>
        <Text style={styles.title}>Usuario</Text>
        <Text style={styles.title}>Correo Electronico</Text>
        <Text style={styles.title}>Usuario@gmail.com</Text>
        </View>
      <Button
       title="Actualizar Cuenta"
       onPress={alert("Actualizar Cuenta")}>
      </Button>
      <Button
      title="Eliminar Cuenta"
      onPress={alert("Eliminar Cuenta")}>
      </Button>
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
  },
    incono:{
    resizeMode: 'contain',
    width: "80%",
    alignSelf:"center",
    maxHeight: "10%"
  }
});
export default DatosUsuario;