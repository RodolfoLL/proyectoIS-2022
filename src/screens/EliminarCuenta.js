import { useState } from "react";
import { View,StyleSheet,ActivityIndicator,Dimensions,Platform,Alert } from "react-native";
import { Input,Button,Icon,Text,Overlay } from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import{useHeaderHeight } from "@react-navigation/elements"
import { size } from "lodash";
import {getAuth,updateProfile,updateEmail,updatePassword, deleteUser} from "firebase/auth"
import {app} from '../../database/firebase'
import { collection, query, where, getDocs ,doc, deleteDoc,updateDoc, onSnapshot} from "firebase/firestore"
import {db} from '../../database/firebase'
//import { deleteUser } from "firebase/auth";

const EliminarCuenta = ({navigation}) =>{
    
    const [mostarContra, setmostarContra] = useState(false)
    const [password, setPassword] = useState("")
    const [errorContra,seterrorContra]= useState("")

    const auth = getAuth(app);
    auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate('Drawer');
      }
    });

   function validarContra(contra){
        const regex = /^[0-9a-zA-Z\_]+$/
        return regex.test(contra) 
        

    }
    /*const ElimCuenta = ()=>{
        seterrorContra("")
       console.log(password)
             if(!validarContra(Datos.contraseña)){
                        seterrorContra("la contraseña no debe tener caracteres especiales o espacios")
                        valido = false
             }
                    deleteUser(user).then(() => {
                        setPassword("")
                    console.log("UID:  "+ user.uid)
                    
                    navigation.navigate("Drawer");

             }).catch(error => { 
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        
                        if(password !== ""){
                        if(errorCode == "auth/wrong-password"){
                            
                            seterrorContra("Contraseña incorrecta")
                        }else{
                           
                            seterrorEmail("Correo no registrado")
                        }
                        }else{
                        seterrorContra("No se ingreso contraseña")
                        }
                        
                    })
    }*/

    

     
   return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
       
        <Text style={styles.titulo}>  Eliminar Cuenta </Text>      
        <Text style={styles.text}> Contraseña</Text>

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
        <TouchableOpacity style={styles.botonEliminar}       onPress={() =>     ElimCuenta()}>
            <Text style={styles.textEliminar}>   ELIMINAR  </Text>
        </TouchableOpacity>
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
  }
});

export default EliminarCuenta;