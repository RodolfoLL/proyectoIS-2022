import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Platform, Alert, Image } from "react-native";
import { Input, Button, Icon, Text, Overlay } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useHeaderHeight } from "@react-navigation/elements"
import { size } from "lodash";
import { getAuth, updateProfile, updateEmail, updatePassword, deleteUser, signInWithEmailAndPassword } from "firebase/auth"
import { app } from '../../database/firebase'
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore"
import { db } from '../../database/firebase'
import { Ionicons } from '@expo/vector-icons';
//import { deleteUser } from "firebase/auth";

const VerificarContraseña = ({ navigation, route }) => {

  const [mostarContra, setmostarContra] = useState(false)
  const [password, setPassword] = useState("")
  const [errorContra, seterrorContra] = useState("")
  const [loading,setLoading] = useState(false)
  const [contadorBoton,setContador] = useState(0)
  useEffect(() => {
    setContador(0);
  }, [route])
  const auth = getAuth();
  const user = auth.currentUser;
  let email ="";
  if(user != null){email = user.email;}
  
  const { Tipo } = route.params;


  function Loading({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgoundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View style={styles.view}>
                <ActivityIndicator
                    size="large"
                    color="#442484"
                />
                {
                    text && <Text style={styles.text2}>{text}</Text>
                }
            </View>
        </Overlay>
    )
}
  let nombreBoton = "";
  if (Tipo == "Actualizar") {
    navigation.setOptions({ title: 'Editar Datos del Usuario' })
    nombreBoton = "Verificar"

  } else {
    nombreBoton = "Eliminar"
    navigation.setOptions({ title: 'Eliminar Cuenta' })
  }

  function validarContra(contra) {
    const regex = /^[0-9a-zA-Z\_]+$/
    let bandera = true;
    if(contra==""){
      setLoading(false)
      Alert.alert("Error", "El campo de la contraseña no puede ser vacio.", [
        { text: "OK", onPress: () => { console.log("ok contraseña erronea") } }
      ])
      bandera = false;
    }else{
      if(!regex.test(contra)){
        setLoading(false);
        Alert.alert("Error", "La contraseña ingresada es incorrecta", [
          { text: "OK", onPress: () => { console.log("ok contraseña erronea") } }
        ])
        bandera = false;
      }
    }
    return bandera
  }
  async function inicioSesion() {
    let respuesta = { estado: true }
    await signInWithEmailAndPassword(auth, email, password)
      .then(credencial => { console.log("Se inició sesion") })
      .catch(errorr => {
        console.log(errorr.code)
        respuesta.estado = false
      })
    return respuesta;
  }
  const VerificarContraseña = async () => {
    seterrorContra("")
    console.log(password)
    setLoading(true)
    if (contadorBoton == 5){
      setLoading(false)
      Alert.alert("Error ", "Se equivocó muchas veces al ingresar su contraseña.", [
        { text: "OK", onPress: () => {navigation.navigate("Recordatorios"); } }
      ])
    }else{
      if (validarContra(password)) {
        const resultInicioSesion = await inicioSesion()
        const estaReautenticado = resultInicioSesion.estado
        if (estaReautenticado) {
          if (Tipo == "Eliminar") {
            deleteUser(user)
              .then(() => {
                setLoading(false)
                console.log(user)
  
                navigation.navigate("Login");
  
                Alert.alert("Cuenta Eliminada ", "La cuenta fue eliminada correctamente", [
                  { text: "OK", onPress: () => { console.log("ok a Login") } }
                ])
              })
              .catch(error => {
                setLoading(false)
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
  
              }
              )
          } else {
            setLoading(false)
            navigation.navigate("Editar datos");
          }
  
        }else{
          setLoading(false)
          Alert.alert("Error", "La contraseña ingresada es incorrecta.", [
            { text: "OK", onPress: () => { console.log("ok contraseña erronea") } }
          ])
        }
      }
    }
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>


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
              name={mostarContra ? "eye-outline" : "eye-off-outline"}
              iconStyle={styles.icon}
              onPress={() => setmostarContra(!mostarContra)}
            />
          }
        />

        <TouchableOpacity style={styles.botonEliminar} onPress={() =>{
                                                                      console.log("--***----*****--***"+contadorBoton)
                                                                      setContador(prev => prev + 1)
                                                                      VerificarContraseña()
                                                                      }}>
          <Text style={styles.textEliminar}> {nombreBoton}</Text>
        </TouchableOpacity>
        <Loading isVisible={loading} text = {Tipo == "Eliminar" ? "Eliminando cuenta...": "Verificando datos ..."}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    paddingLeft: 15,
    paddingRight: 15,
  },

  incono: {
    resizeMode: 'contain',
    width: "90%",
    alignSelf: "center",
    maxHeight: "20%"
  },
  titulo: {
    color: "white",
    fontSize: 30,
    marginTop: 15,
    alignSelf: "center",
    marginBottom: "15%",
    fontWeight: 'bold'
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  input: {
    width: "100%",
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    color: "white",
    backgroundColor: "#001B48"
  },
  icon: {
    color: "white",
    borderColor: "white"
  },
  recuperarPassword: {
    fontSize: 15,
    color: "white",
    textDecorationLine: 'underline',
    marginBottom: "18%"
  },
  botonEliminar: {
    backgroundColor: "#0093B7",
    fontSize: 30,
    width: "80%",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 30,
    alignSelf: "center"
  },
  textEliminar: {
    color: "white",
    fontSize: 23,

  }, incono: {
    resizeMode: 'contain',
    alignSelf: "center",
    maxHeight: "20%",
    marginTop: 30
  },
  overlay : {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#442484",
    borderWidth: 2,
    borderRadius: 10
  },
  view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center" 
  }
});

export default VerificarContraseña;