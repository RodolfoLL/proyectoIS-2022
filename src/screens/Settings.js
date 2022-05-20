
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'
import {app} from '../../database/firebase'
import { getAuth} from 'firebase/auth';
import {Ionicons} from '@expo/vector-icons';

const TamañoDeFuente = ({navigation}) => {

    const [fuente,setFuente] = useState({fontSize: 20})
    const [fuenteTitulo,setFuenteTitulo] = useState({fontSize: 30})
    const [fuenteBaseDatos,setFuenteBaseDatos] = useState({fontSize: 20})

    const auth = getAuth(app);
    const user = auth.currentUser;
    const uid = user.uid;
    console.log("identificador "+uid)

    useEffect( () =>{
        onSnapshot(doc(db, "Fuentes", uid), (doc) => {
            console.log("Current data: ", doc.data());
            actualizarFuente()
            console.log("===========================")
            console.log(fuente)
            console.log(fuenteTitulo)
            console.log("===========================")
        });
    },[]
    ); 
    
    const actualizarFuente = async() =>{
        console.log("FUENTE===========================")
        const docRef = doc(db, "Fuentes",uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().fontSize)
        
        cambiarFuente(docSnap.data().fontSize.fontSize)
    }

    const cambiarFuente = (tamanio) =>{
        const fuenteTemporal = {...fuente};
        const fuenteTemporalTitulo = {...fuenteTitulo};
        fuenteTemporal.fontSize = tamanio;
        fuenteTemporalTitulo.fontSize = tamanio+10;
        setFuente(fuenteTemporal);
        setFuenteTitulo(fuenteTemporalTitulo);
    }

    const guardarFuente = async() =>{
        console.log("==========================")
        console.log(uid)
        let  datosFuente  =  {
            fontSize : fuente
        }

        const docref = doc(db,"Fuentes",uid)
        await setDoc(docref,datosFuente)

        navigation.navigate("Recordatorios");
    }

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

    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={[styles.title, fuenteTitulo]}>Configuraciones</Text>
            </View>

            <View style={[styles.box, styles.box2]}>
                <Text style={[styles.subtitle, fuente]}>Tamaño de letra:</Text>
                <TouchableOpacity style={styles.boton}
                    onPress={() => cambiarFuente(20)} >
                    <Text style={[styles.textBoton, fuente]}>Pequeño</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => cambiarFuente(25)}  >
                    <Text style={[styles.textBoton, fuente]}>Mediano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => cambiarFuente(30)}  >
                    <Text style={[styles.textBoton, fuente]}>Grande</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonGuardar}
                    onPress={() => guardarFuente()}  >
                    <Text style={[styles.textBoton, fuente]}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#001B48',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    box1: {
        flex: 1,
        paddingTop: 50,
    },
    box2: {
        flex: 6
    },
    title:{
        color: '#fff',
        fontWeight: 'bold'
    },
    subtitle:{
        color: '#fff',
        marginBottom: 15,
        right: "15%"
    },
    boton:{
        backgroundColor: "#0093B7",
        borderRadius:10,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center',
        paddingHorizontal: "10%"
    },
    textBoton:{
        fontSize: 20,
        color: "#fff"
    },
    botonGuardar:{
        backgroundColor: "#0093B7",
        borderRadius:10,
        marginTop: 30,
        padding: 10,
        alignItems: 'center',
        paddingHorizontal: "10%"
    }
});

export default TamañoDeFuente