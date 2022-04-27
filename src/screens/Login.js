import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button,TouchableOpacity, Image,Text, Alert} from 'react-native'


import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../database/firebase'

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth(app);

    const saveNewUser = () => {
      console.log(email+" "+ password)
      if(verificarEmail()){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Signed in!')
          const user = userCredential.user;
          //console.log(user)
          console.log("UID:  "+ user.uid)
          props.navigation.navigate("Recordatorios",{uid: user.uid})
        })
        .catch(error => {
          //console.log(error)
          Alert.alert("Correo no registrado")
        })
      }else{
        Alert.alert("Formato invalido","El formato de Email ingresado es incorrecto")
      }
      
    }

    const verificarEmail = () => {
      let emailTemporal = email.substring(email.length-10,email.length)
      console.log(emailTemporal)
      let emailCorrecto = false
      if(emailTemporal === "@gmail.com"){
        emailCorrecto = true
      }
      return emailCorrecto
    }

    const registrarUsuario = () => {
      props.navigation.navigate("RegistroUsuario");
    }
return (
    <View style={styles.container}>

      <View style={styles.contenedorLogo}>
        <Image
          style={styles.incono}
          source={require("../assets/icono.png")}
        />
        <Text style={styles.titulo}>
          MEDICATE 
        </Text>
      </View>
      

      <View style={styles.inputGroup}>

        <Text style={styles.label}>
          Correo Electronico 
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          //value={email}
        />
      
        <Text style={styles.label}>
          Contraseña
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          //value={password}
          secureTextEntry
        />
        <Text style={styles.recuperarPassword} onPress={() => alert("ir a cambiar la contraseña")}>Olvidaste la contraseña?</Text>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonLogin}
          onPress={() => saveNewUser()}>
          <Text style={styles.textLogin}>INICIAR SESION</Text>
        </TouchableOpacity>

        <Text style={styles.botonRegister} onPress={() => registrarUsuario()}>Registrarse</Text>
      </View>
    </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  contenedorLogo:{
    flex: 6,
    width: "80%",
    paddingTop: "5%",
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: "red"
  },
  incono:{
    resizeMode: 'center',
    width: "80%",
    height: "80%"
  },
  titulo:{ 
    fontSize: 35, 
    color: 'white', 
    fontWeight: 'bold' 
  },
  inputGroup: {
    flex: 8,
    width: "80%",
    paddingTop: "25%",
    //backgroundColor: "green"
  },
  label:{
    fontSize: 20,
    color:"white",
    marginTop: 10
  },
  input:{
    backgroundColor: "#001B48",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "white",
    borderWidth: 2
  },
  recuperarPassword:{
    fontSize: 15,
    color:"white",
    marginTop: 5,
    textDecorationLine:'underline'
  },
  botones:{
    flex: 3,
    width: "80%",
    //backgroundColor:"black",
    //paddingTop: "3%",
    alignItems: "center"
  },
  botonLogin:{
    backgroundColor: "#0093B7",
    fontSize: 30,
    width: "80%",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    alignItems: "center",
    borderRadius: 15,
  },
  textLogin:{
    color: "white",
    fontSize: 23
  },
  botonRegister:{
    fontSize: 20,
    color:"white",
    marginTop: 5,
    textDecorationLine:'underline'
  }
});

export default Login