import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button,ScrollView} from 'react-native'


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../database/firebase'

const RegistroUsuario = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth(app);
    
    const registrarUsuario = () => {
    
      console.log(email+" "+ password)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!')
        const user = userCredential.user;
        console.log("=============================")
        console.log("=============================")
        console.log(user)
        props.navigation.navigate("Login");

      })
      .catch(error => {
        console.log(error)
      })
    }

return (
    <ScrollView style={styles.container}>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="password"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
      </View>

      <View style={styles.button}>
        <Button title="Registrar" onPress={() => registrarUsuario()} />
      </View>
    </ScrollView>
)
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
    loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    button:{
      marginVertical: 5
    }
  });

export default RegistroUsuario