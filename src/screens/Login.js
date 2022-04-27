import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button,TouchableOpacity, Image,Text, Alert} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { Input,Icon } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../database/firebase'

const Login = (props) => {
    const [mostarContra, setmostarContra] = useState(false)
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
  <KeyboardAwareScrollView style={styles.scroll} contentContainerStyle={{flex: 1}}>
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
        <Input
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"

          //value={email}
        />
      
        <Text style={styles.label}>
          Contraseña
        </Text>
        <Input
          style={styles.input}
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
      </View>

      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonLogin}
          onPress={() => saveNewUser()}>
          <Text style={styles.textLogin}>INICIAR SESION</Text>
        </TouchableOpacity>

        <Text style={styles.botonRegister} onPress={() => registrarUsuario()}>Registrarse</Text>
      </View>
    </View>
    </KeyboardAwareScrollView>
)}

const styles = StyleSheet.create({
  scroll:{
    //backgroundColor: "yellow",
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: "100%"
  },
  contenedorLogo:{
    flex: 2,
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
    flex: 3,
    width: "80%",
    paddingTop: "15%",
    //backgroundColor: "green"
  },
  label:{
    fontSize: 20,
    color:"white",
    marginTop: "0%",
    paddingTop: "0%",
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
  icon: {
    color: "white"
  },
  recuperarPassword:{
    fontSize: 15,
    color:"white",
    textDecorationLine:'underline',
    marginTop: "0%",
    paddingTop: "0%",
  },
  botones:{
    flex: 1,
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