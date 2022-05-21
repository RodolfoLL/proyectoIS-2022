import React, { useState , useEffect} from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert,Image } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import {collection, addDoc,doc,setDoc,onSnapshot} from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import {app,db} from '../../database/firebase'
import { Feather } from '@expo/vector-icons';

const DatosUsuario = ( {navigation , props, route}) => {

  navigation.setOptions({
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ paddingRight: 10 }}
        >
            <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>  
    ),

})
   
    let auth = getAuth(app);
    let uid = auth.currentUser.uid;
    const [userName,setUsername]= useState(auth.currentUser.displayName)
    const [emailUser,setEmail] = useState(auth.currentUser.email)
    useEffect( () =>{
      onSnapshot(collection(db,auth.currentUser.email), (snapshot) =>{
        console.log(snapshot.docs)
        auth = getAuth(app);
        setUsername(auth.currentUser.displayName);
        setEmail(auth.currentUser.email);
      });
    },[])
    
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
      <Image
          style={styles.incono}
          source={require("../assets/capt.png")}
        />
        <View style={styles.contenido}>
        <Text style={styles.title}>Nombre de Usuario</Text>
        <Text style={styles.subtitle}>{userName}</Text>
        <Text style={styles.title}>Correo Electronico</Text>
        <Text style={styles.subtitle}>{emailUser}</Text>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            onPress={() => navigation.navigate("verificar Contraseña",{Tipo:"Actualizar"})}
          > 
          
            <Text style={styles.title}>Actualizar Cuenta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity
            onPress={() => navigation.navigate("verificar Contraseña", {Tipo:"Eliminar"})}
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
    fontSize: 24,
    paddingTop: 5,
    color: 'white',
    textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    paddingTop: 5,
    color: 'white',
    textAlign: "center"
  },
  opciones: {
    margin: 20,
  },
  contenido:{
    margin:'10%'
  },
  botones: {
    alignItems: 'center',
    backgroundColor: '#0093B7',
    marginBottom: '10%',
    borderRadius: 25,
    fontSize: 20,
    marginLeft: '10%',
    height: 40,
    width: 250,
  },
    incono:{
    resizeMode: 'contain',
    alignSelf:"center",
    maxHeight: "20%",
    marginTop: 30
    }
});
export default DatosUsuario;