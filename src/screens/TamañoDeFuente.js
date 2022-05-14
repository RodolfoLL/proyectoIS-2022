import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../../database/firebase'


const TamañoDeFuente = (props) => {

    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Text style={styles.title}>Configuraciones</Text>
            </View>

            <View style={[styles.box, styles.box2]}>
                <Text style={styles.subtitle}>Tamaño de letra:</Text>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(5)} >
                    <Text style={styles.textBoton}>Pequeño</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(10)}  >
                    <Text style={styles.textBoton}>Mediano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}
                    onPress={() => guardarDuracion(7)}  >
                    <Text style={styles.textBoton}>Grande</Text>
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
        fontSize: 35,
        color: '#fff',
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize: 20,
        color: '#fff',
        position: "relative",
        paddingLeft: 0,
        marginRight: "50%",
        marginBottom: 15
    },
    boton:{
        backgroundColor: "#0093B7",
        borderRadius:10,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center',
        marginHorizontal: "25%"
    },
    textBoton:{
        fontSize: 20,
        color: "#fff"
    }
});

export default TamañoDeFuente