import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button,TouchableOpacity,Text, Image, Alert} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { Input,Icon } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../database/firebase'

const Login = (props) => {
    const [mostarContra, setmostarContra] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth(app);

    const iniciarSesion = () => {
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
      props.navigation.navigate("Registro Usuario");
    }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={styles.incono}
          source={require("../assets/icono.png")}
        />
        <Text style={styles.titulo}>
          MEDICATE 
        </Text>
      
        <Text style={styles.text}>
          Correo Electronico 
        </Text>
        <Input style={styles.text}
          containerStyle={styles.input}
          placeholder="email@address.com"
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
          //value={email}
        />
      
        <Text style={styles.text}>
          Contraseña
        </Text>
        <Input style={styles.text}
          containerStyle={styles.input}
          placeholder="Contraseña"
          onChangeText={(value) => setPassword(value)}
          //value={password}
          secureTextEntry={!mostarContra}
          rightIcon={
            <Icon
                type="material-community"
                name={ mostarContra ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.icon}
                onPress={() => setmostarContra(!mostarContra)}
            />
          }
        />
        <Text style={styles.recuperarPassword} onPress={() => alert("ir a cambiar la contraseña")}>Olvidaste la contraseña?</Text>
     
        <TouchableOpacity style={styles.botonLogin}
            onPress={() => iniciarSesion()}  >
            <Text style={styles.textLogin}>INICIAR SESION</Text>
        </TouchableOpacity>
        
        <Text style={styles.botonRegister} onPress={() => registrarUsuario()}>Registrarse</Text>  
      </View>
    </KeyboardAwareScrollView>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    paddingLeft: 35,
    paddingRight: 35,
    color: 'white'
  },
  incono:{
    resizeMode: 'contain',
    width: "90%",
    alignSelf:"center",
    maxHeight: "20%"
  },
  titulo:{
    color: "white",
    fontSize: 40,
    alignSelf: "center",
    marginBottom: "12%",
    fontWeight: 'bold'
  },
  text:{
    color: "white",
    fontSize: 20,
  },
  input:{
    width: "100%",
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    color:"white",
    backgroundColor:"#001B48"
  },
  icon: {
    color: "white",
    borderColor: "white"
  },
  recuperarPassword:{
    fontSize: 15,
    color:"white",
    textDecorationLine:'underline',
    marginBottom: "18%"
  },
  botonLogin:{
    backgroundColor: "#0093B7",
    fontSize: 30,
    width: "80%",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center"
  },
  textLogin:{
    color: "white",
    fontSize: 23
  },
  botonRegister:{
    fontSize: 20,
    color:"white",
    marginTop: 5,
    textDecorationLine:'underline',
    alignSelf: "center"
  }
});

export default Login