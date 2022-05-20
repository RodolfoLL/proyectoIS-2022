import { useState } from "react";
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

const verificarContraseña = ({ navigation, route }) => {

  const [mostarContra, setmostarContra] = useState(false)
  const [password, setPassword] = useState("")
  const [errorContra, seterrorContra] = useState("")

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;
  const { Tipo } = route.params;



  let nombreBoton = "";
  if (Tipo == "Actualizar") {
    navigation.setOptions({ title: 'Editar Datos del Usuario' })
    nombreBoton = "Actualizar"

  } else {
    nombreBoton = "Eliminar"
    navigation.setOptions({ title: 'Eliminar Cuenta' })
  }

  function validarContra(contra) {
    const regex = /^[0-9a-zA-Z\_]+$/
    return regex.test(contra)
  }
  async function inicioSesion() {
    let respuesta = { estado: true }
    await signInWithEmailAndPassword(auth, email, password)
      .then(credencial => { console.log("Se inició sesion") })
      .catch(errorr => {
        respuesta.estado = false
      })
    return respuesta;
  }
  const verificarContraseña = async () => {
    seterrorContra("")
    console.log(password)
    if (!validarContra(password)) {
      seterrorContra("La contraseña no debe tener caracteres especiales o espacios")
    } else {
      const resultInicioSesion = await inicioSesion()
      const estaReautenticado = resultInicioSesion.estado
      if (estaReautenticado) {
        if (Tipo == "Eliminar") {
          deleteUser(user)
            .then(() => {
              console.log(user)

              navigation.navigate("Login");

              Alert.alert("Cuenta Eliminada ", "La cuenta fue eliminada corrcetamnete", [
                { text: "OK", onPress: () => { console.log("ok a Login") } }
              ])
            })
            .catch(error => {
              console.log(error)
              const errorCode = error.code;
              const errorMessage = error.message;

            }
            )
        } else {
          navigation.navigate("Editar datos");
        }

      }else{
        Alert.alert("Error", "La contraseña ingresada es incorecta.", [
          { text: "OK", onPress: () => { console.log("ok contraseña erronea") } }
        ])
      }
    }
  }
  return (
    <KeyboardAwareScrollView style={styles.container}>
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

        <TouchableOpacity style={styles.botonEliminar} onPress={() => verificarContraseña()}>
          <Text style={styles.textEliminar}> {nombreBoton}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
  }
});

export default verificarContraseña;