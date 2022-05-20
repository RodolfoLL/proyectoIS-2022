import { useState } from "react";
import { View,StyleSheet,TouchableOpacity,ActivityIndicator,Dimensions,Platform,Alert,Image } from "react-native";
import { Input,Button,Icon,Text,Overlay } from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import{useHeaderHeight } from "@react-navigation/elements"
import { size } from "lodash";
import {getAuth,updateProfile,updateEmail,updatePassword, deleteUser, signInWithEmailAndPassword} from "firebase/auth"
import {app} from '../../database/firebase'
import { collection, query, where, getDocs ,doc, deleteDoc,updateDoc, onSnapshot} from "firebase/firestore"
import {db} from '../../database/firebase'
import { Ionicons } from '@expo/vector-icons'; 
//import { deleteUser } from "firebase/auth";

const EliminarCuenta = ({navigation}) =>{
    
    const [mostarContra, setmostarContra] = useState(false)
    const [password, setPassword] = useState("")
    const [errorContra,seterrorContra]= useState("")

    const auth = getAuth();
    const user = auth.currentUser;
    const email = user.email;

   function validarContra(contra){
        const regex = /^[0-9a-zA-Z\_]+$/
        return regex.test(contra) 
    }
    async function inicioSesion(){
        let respuesta = {estado: true}
        await signInWithEmailAndPassword(auth, email, password)
        .then(credencial =>{console.log("Se inició sesion")})
        .catch(errorr => {
          respuesta.estado = false
          
        })
        return respuesta;
      }
      const ElimCuenta = async()=>{
          seterrorContra("")
         console.log(password)
               if(!validarContra(password)){
                          seterrorContra("Contrasña Incorecta")
               }else {
                const resultInicioSesion = await inicioSesion()
                const estaReautenticado = resultInicioSesion.estado
                 if(estaReautenticado){
                  deleteUser(user)
                  .then(() => {
                      // setPassword("")
                  console.log(user)
                  
                  navigation.navigate("Login");
  
                  })
                  .catch(error => { 
                    console.log(error)
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      
                      
                      
                  }
                  )
                 }
               }
      }
   return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
     
        <Text style={styles.titulo}>  Eliminar Cuenta </Text>    
         <Image
          style={styles.incono}
          source={require("../assets/capt.png")}
        />

        <Text style={styles.text}> Contraseña Actual</Text>

        <Input style={styles.text}
          containerStyle={styles.input}
          placeholder="Contraseña"
          onChangeText={(value) => setPassword(value)}
          errorMessage={errorContra}
          value={password}
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
        <Text style={styles.recuperarPassword} onPress={() => navigation.navigate('Recuperar contraseña')}>Olvidaste la contraseña?</Text>
        <TouchableOpacity style={styles.botonEliminar}       onPress={() => ElimCuenta()}>
            <Text style={styles.textEliminar}>   ELIMINAR  </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
)}

const styles = StyleSheet.create({
  container: {
  flex: 1,
        backgroundColor: '#001B48',
        paddingLeft: 15,
        paddingRight: 15,
      },
   
  incono:{
    resizeMode: 'contain',
    width: "90%",
    alignSelf:"center",
    maxHeight: "20%"
  },
  titulo:{
    color: "white",
    fontSize: 30,
    marginTop: 15,
    alignSelf: "center",
    marginBottom: "15%",
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
  botonEliminar:{
    backgroundColor: "#0093B7",
    fontSize: 30,
    width: "80%",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center"
  },
  textEliminar:{
    color: "white",
    fontSize: 23
  },incono:{
    resizeMode: 'contain',
    alignSelf:"center",
    maxHeight: "20%",
    marginTop: -5
    }
});

export default EliminarCuenta;