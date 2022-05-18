import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'
import {collection, addDoc,query, where, getDocs } from 'firebase/firestore';

const TamañoDeFuente = (props) => {

    const {uid} = props.route.params;
    console.log("identificador "+uid)

    const [fuente,setFuente] = useState({fontSize: 20})
    const [fuenteTitulo,setFuenteTitulo] = useState({fontSize: 30})

    const cambiarFuente = (tamanio) =>{
        const fuenteTemporal = {...fuente};
        const fuenteTemporalTitulo = {...fuenteTitulo};
        fuenteTemporal.fontSize = tamanio;
        fuenteTemporalTitulo.fontSize = tamanio+10;
        setFuente(fuenteTemporal);
        setFuenteTitulo(fuenteTemporalTitulo);
    }

    const guardarFuente = async() =>{
        /*// Create a reference to the cities collection
        const citiesRef = collection(db, "Fuentes");

        // Create a query against the collection.
        const q = query(citiesRef, where("id", "==", uid));
        console.log("==========================")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
            const docref = doc(db,"Fuentes",doc.id)
            console.log(docref)
            console.log(datos);
            await setDoc(docref,datos)
        });
        console.log("==========================")*/
        console.log("==========================")
        console.log(uid)
        let  datosFuente  =  {
            fontSize : fuente
        }

        const docref = doc(db,"Fuentes",uid)
        //console.log(docref)
        //console.log(datos);
        await setDoc(docref,datosFuente)

        props.navigation.navigate("Recordatorios");
    }

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
        right: "20%"
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